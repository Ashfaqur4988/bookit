import logger from "../logger";

export const setCookie = (res, accessToken, refreshToken) => {
  logger.info("Setting cookie.");
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // to prevent XSS attacks, cross site scripting
    sameSite: "strict", // csrf prevention, cross site request forgery
    secure: process.env.NODE_ENV !== "development", // cookie only works in https
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  logger.info("Access token set in Cookie");

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // to prevent XSS attacks, cross site scripting
      sameSite: "strict", // csrf prevention, cross site request forgery
      secure: process.env.NODE_ENV !== "development", // cookie only works in https
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  logger.info("Refresh token set in Cookie");
};
