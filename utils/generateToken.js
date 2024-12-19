import jwt from "jsonwebtoken";
import logger from "../logger";

export const generateToken = (userId) => {
  logger.info("Token generating process started.");
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  logger.info("Access token generated successfully.");

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  logger.info("Refresh token generated successfully.");

  return { accessToken, refreshToken };
};
