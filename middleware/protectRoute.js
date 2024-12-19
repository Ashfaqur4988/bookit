import jwt from "jsonwebtoken";
import logger from "../logger.js";

export const protectRoute = (req, res, next) => {
  logger.info("From protectRoute middleware.");
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      logger.error("No access token provided. Error from protectRoute.");
      return res.status(401).json({ message: "No access token provided" });
    }
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          logger.error("Invalid access token. Error from protectRoute.");
          return res.status(401).json({ message: "Invalid access token" });
        } else {
          logger.info("Access token verified.");
          req.userId = payload.userId;
        }
        next();
      }
    );
  } catch (error) {
    logger.error("Error from protectRoute middleware.", error.message);
    res.status(500).json({ message: error.message });
  }
};
