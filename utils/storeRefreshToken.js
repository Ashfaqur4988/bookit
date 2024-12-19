import { redis } from "../lib/redis.js";
import logger from "../logger.js";

export const storeRefreshToken = async (userId, refreshToken) => {
  logger.info("Refresh token storing process started.");
  try {
    await redis.set(
      `refreshToken:${userId}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60
    );

    logger.info("Refresh token stored successfully.");
  } catch (error) {
    logger.error("Redis error:", error.message);
    console.log(error);
  }
};
