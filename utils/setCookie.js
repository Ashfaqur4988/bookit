export const setCookie = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // to prevent XSS attacks, cross site scripting
    sameSite: "strict", // csrf prevention, cross site request forgery
    secure: process.env.NODE_ENV !== "development", // cookie only works in https
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // to prevent XSS attacks, cross site scripting
      sameSite: "strict", // csrf prevention, cross site request forgery
      secure: process.env.NODE_ENV !== "development", // cookie only works in https
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
};
