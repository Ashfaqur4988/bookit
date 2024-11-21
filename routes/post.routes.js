import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../controllers/post.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getSinglePost);

router.post("/", protectRoute, createPost);

router.put("/:id", protectRoute, updatePost);

router.delete("/:id", protectRoute, deletePost);

export default router;
