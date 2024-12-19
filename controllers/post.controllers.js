import prisma from "../lib/prisma.js";
import { redis } from "../lib/redis.js";
import logger from "../logger.js";
export const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10, city, type, maxPrice, minPrice } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const skip = (pageNumber - 1) * pageSize;

  const cacheKey = `posts:${JSON.stringify(req.query)}`;
  const maxPriceFinal = !isNaN(parseInt(maxPrice))
    ? parseInt(maxPrice)
    : 1000000;
  const minPriceFinal = !isNaN(parseInt(minPrice)) ? parseInt(minPrice) : 0;
  logger.info("From getAllPosts in post controller.");
  logger.info("Query: ", req.query);
  try {
    const isQueryEmpty =
      Object.keys(req.query) === 0 ||
      Object.values(req.query).every((value) => !value);

    if (isQueryEmpty) {
      logger.info("Query is empty. Returning all posts.");
      console.log("Returning all posts");
    }

    //if present in redis
    let posts;
    try {
      posts = await redis.get(cacheKey);
      if (posts) {
        posts = JSON.parse(posts);
        logger.info("Posts fetched from Redis.");
        return res.status(200).json(posts);
      }
    } catch (error) {
      logger.error("Redis error:", error.message);
    }

    posts = await prisma.post.findMany({
      where: isQueryEmpty
        ? {}
        : {
            city: city ?? undefined,
            type: type ?? undefined,
            price: {
              gte: minPriceFinal,
              lte: maxPriceFinal,
            },
          },
      skip,
      take: pageSize,
      include: {
        user: true,
        postDetail: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalPosts = await prisma.post.count({
      where: {
        city: city ?? undefined,
        type: type ?? undefined,
        price: {
          gte: minPriceFinal,
          lte: maxPriceFinal,
        },
      },
    });

    const totalPages = Math.ceil(totalPosts / pageSize);

    if (!posts || posts.length === 0) {
      logger.error("No posts found.");
      return res.status(200).json({ message: "No posts found", posts: [] });
    }

    //set in redis
    try {
      await redis.set(
        cacheKey,
        JSON.stringify({ posts, totalPosts, totalPages }),
        "EX",
        300
      );
    } catch (error) {
      logger.error("Redis set error:", error.message);
      res.status(500).json({ message: "Redis set error", error });
    }
    res
      .status(200)
      .json({ posts, totalPosts, totalPages, currentPage: pageNumber });
    logger.info("Posts fetched from database.");
  } catch (error) {
    logger.error("Error from getAllPosts in post controller.", error.message);
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
      logger.error("Single Post not found.");
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
    logger.info("Single Post fetched successfully.");
  } catch (error) {
    logger.error("Error from getSinglePost in post controller.", error.message);
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
        price: parseInt(postData.price),

        user: {
          connect: { id: tokenUserId }, // Associate the post with the authenticated user
        },
        postDetail: { create: postDetail },
      },
    });

    try {
      await redis.del("posts");
    } catch (error) {
      logger.error("Redis del error:", error.message);
    }

    res.status(200).json({ newPost });
    logger.info("Post created successfully.");
  } catch (error) {
    logger.error("Error from createPost in post controller.", error.message);
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
      logger.error("Post not found. Error from updatePost in post controller.");
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      logger.error("Unauthorized. Error from updatePost in post controller.");
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

    try {
      await redis.del("posts");
      await redis.set(`post:${id}`, JSON.stringify(updatedPost), "EX", 300);
    } catch (error) {
      logger.error("Redis error:", error.message);
    }

    // Rebuild the posts cache
    const allPosts = await prisma.post.findMany({});
    try {
      await redis.set("posts", JSON.stringify(allPosts), "EX", 600);
    } catch (error) {
      logger.error("Redis error:", error.message);
    }

    res.status(200).json({ updatedPost });
    logger.info("Post updated successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error("Error from updatePost in post controller.", error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      logger.error("Post not found. Error from deletePost in post controller.");
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      logger.error("Unauthorized. Error from deletePost in post controller.");
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      await prisma.post.delete({ where: { id } });

      await redis.del("posts");
      await redis.del(`post:${id}`);
    } catch (error) {
      logger.error("Redis error:", error.message);
    }

    res.status(200).json({ message: "Post deleted successfully" });
    logger.info("Post deleted successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error("Error from deletePost in post controller.", error.message);
  }
};
