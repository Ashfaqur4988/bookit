import prisma from "../lib/prisma.js";

export const addReview = async (req, res) => {
  const { rating, comment, postId } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: req.userId },
        },
      },
      include: {
        user: {
          select: {
            username: true,
            profilePicture: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostReview = async (req, res) => {
  const { postId } = req.params.id;

  try {
    const reviews = await prisma.review.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: {
            username: true,
            profilePicture: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
