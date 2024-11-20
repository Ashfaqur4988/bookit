import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "No access token provided" });
    }
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "Invalid access token" });
        } else {
          req.userId = payload.userId;
        }
        next();
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
