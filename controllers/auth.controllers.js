import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import { storeRefreshToken } from "../utils/storeRefreshToken.js";
import { setCookie } from "../utils/setCookie.js";
import { redis } from "../lib/redis.js";
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, from: "error from register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const { accessToken, refreshToken } = generateToken(user.id);
      storeRefreshToken(user.id, refreshToken);
      setCookie(res, accessToken, refreshToken);
      res
        .status(200)
        .json({ message: "User logged in successfully", user: user.id });
    } else {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  console.log("logout");
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = (req, res) => {
  try {
    res.status(200).json({ user: req.userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;
    const storedRefreshToken = await redis.get(`refreshToken:${userId}`);

    if (storedRefreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const { accessToken } = generateToken(userId);
    setCookie(res, accessToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
