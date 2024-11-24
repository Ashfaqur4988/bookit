import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import reviewRouter from "./routes/review.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
