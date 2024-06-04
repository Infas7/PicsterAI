import express from "express";

import {
  login,
  forgotPassword,
  resetPassword,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export { router as authRouter };
