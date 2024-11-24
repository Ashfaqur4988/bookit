import express from "express";
import { addReview, getPostReview } from "../controllers/review.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/create-review", protectRoute, addReview);
router.get("/get-post-review/:id", protectRoute, getPostReview);

export default router;
