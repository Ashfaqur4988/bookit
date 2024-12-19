import prisma from "../lib/prisma.js";
import logger from "../logger.js";

export const addReview = async (req, res) => {
  logger.info("From addReview in review controller.");
  const { rating, comment, postId } = req.body;

  if (!rating || !comment || !postId) {
    logger.error(
      "Fields are missing. Error from addReview in review controller."
    );
    return res.status(400).json({ message: "All fields are required" });
  }
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
    logger.info(
      "Review added successfully. From addReview in review controller."
    );
  } catch (error) {
    logger.error("Error from addReview in review controller.", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getPostReview = async (req, res) => {
  logger.info("From getPostReview in review controller.");
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
    logger.info(
      "Reviews fetched successfully. From getPostReview in review controller."
    );
  } catch (error) {
    logger.error(
      "Error from getPostReview in review controller.",
      error.message
    );
    res.status(500).json({ message: error.message });
  }
};
