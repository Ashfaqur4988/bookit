import express from "express";
import {
  getUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/get-user", protectRoute, getUser);

router.get("/refresh-token", refreshToken);

export default router;
