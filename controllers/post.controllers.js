import prisma from "../lib/prisma.js";
export const getAllPosts = async (req, res) => {
  //TODO: get all posts
  try {
    const posts = await prisma.post.findMany({});
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        postDetail: { create: body.postDetail },
      },
    });

    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = (req, res) => {
  res.send("From updatePost!");
};

export const deletePost = (req, res) => {
  res.send("From deletePost!");
};
