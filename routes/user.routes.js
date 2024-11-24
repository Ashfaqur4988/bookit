import express from "express";
import { updateUser } from "../controllers/user.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.put("/update-user", protectRoute, updateUser);

export default router;
