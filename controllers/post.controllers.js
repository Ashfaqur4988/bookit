import prisma from "../lib/prisma.js";
import { redis } from "../lib/redis.js";
export const getAllPosts = async (req, res) => {
  try {
    //if present in redis
    let posts = await redis.get("posts");
    if (posts) {
      posts = JSON.parse(posts);
      return res.status(200).json(posts);
    }

    posts = await prisma.post.findMany({
      include: {
        user: true,
        postDetail: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    //set in redis
    await redis.set("posts", JSON.stringify(posts), "EX", 300);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            email: true,
            profilePicture: true,
            id: true,
          },
        },
        review: {
          select: {
            rating: true,
            comment: true,
            id: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                profilePicture: true,
              },
            },
          },
        },
      },
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const tokenUserId = req.userId;
  const { postData, postDetail } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        user: {
          connect: { id: tokenUserId }, // Associate the post with the authenticated user
        },
        postDetail: { create: postDetail },
      },
    });

    await redis.del("posts");

    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...body.postData,
        user: { connect: { id: tokenUserId } },
        postDetail: {
          update: body.postDetail,
        },
      },
    });

    await redis.del("posts");
    await redis.set(`post:${id}`, JSON.stringify(updatedPost), "EX", 300);

    // Rebuild the posts cache
    const allPosts = await prisma.post.findMany({});
    await redis.set("posts", JSON.stringify(allPosts), "EX", 600);

    res.status(200).json({ updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id } });

    await redis.del("posts");
    await redis.del(`post:${id}`);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
