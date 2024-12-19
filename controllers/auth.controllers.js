import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import { storeRefreshToken } from "../utils/storeRefreshToken.js";
import { setCookie } from "../utils/setCookie.js";
import { redis } from "../lib/redis.js";
import logger from "../logger.js";
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      logger.error(
        "Passwords do not match. Error from register in auth controller."
      );
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!username || !email || !password || !confirmPassword) {
      logger.error(
        "Fields are missing. Error from register in auth controller."
      );
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      logger.error(
        "User already exists. Error from register in auth controller."
      );
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { accessToken, refreshToken } = generateToken(newUser.id);

    storeRefreshToken(newUser.id, refreshToken);

    setCookie(res, accessToken, refreshToken);

    res.status(201).json({
      message: "User created successfully",
      username: newUser.username,
      email: newUser.email,
      id: newUser.id,
      profilePicture: newUser.profilePicture,
    });
    logger.info("User created successfully. From register in auth controller.");
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, from: "error from register" });
    logger.error(
      "Error from register in auth controller. Responded with status code 500",
      error.message
    );
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logger.error("Invalid credentials. Error from login in auth controller.");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const { accessToken, refreshToken } = generateToken(user.id);
      storeRefreshToken(user.id, refreshToken);
      setCookie(res, accessToken, refreshToken);
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      });
      logger.info(
        "User logged in successfully. From login in auth controller."
      );
    } else {
      logger.error("Invalid credentials. Error from login in auth controller.");
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(
      "Error from login in auth controller. Responded with status code 500",
      error.message
    );
  }
};

export const logout = async (req, res) => {
  logger.info("User logged out successfully. From logout in auth controller.");
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = decoded.userId;

      await redis.del(`refreshToken:${userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User logged out successfully" });

    logger.info(
      "User logged out successfully. From logout in auth controller."
    );
  } catch (error) {
    logger.error("Error from logout in auth controller.", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  logger.info("From getUser in auth controller.");
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
        posts: true,
        savedPost: true,
      },
    });
    res.status(200).json(user);
    logger.info("User fetched successfully. From getUser in auth controller.");
  } catch (error) {
    logger.error("Error from getUser in auth controller.", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  logger.info("From refreshToken in auth controller.");
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      logger.error("No refresh token provided. Error from refreshToken.");
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;
    const storedRefreshToken = await redis.get(`refreshToken:${userId}`);

    if (storedRefreshToken !== refreshToken) {
      logger.error("Invalid refresh token. Error from refreshToken.");
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const { accessToken } = generateToken(userId);
    setCookie(res, accessToken);
    res.status(200).json({ accessToken });

    logger.info("Refresh token refreshed successfully. From refreshToken.");
  } catch (error) {
    logger.error("Error in refresh token controller: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
