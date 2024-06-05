import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//routes imports
import { authRouter } from "./routes/auth.js";
import { imageRouter } from "./routes/image.js";
import { requireAuth } from "./middlewares/auth.js";

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db....");
      console.log("Server started and listening on port: " + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.ORIGIN],
    credentials: true,
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//routes
app.use("/", (req, res) => {
  return res.send("Hello. It's working...");
});
app.use("/auth", authRouter);
app.use("/image", requireAuth, imageRouter);
