import express from 'express';
import { authorizeUser } from '../middlewares/auth.js';

import {
  login,
  // signout,
  forgotPassword,
  resetPassword,
  register,
  // verifyUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
// router.get('/logout', signout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
// router.get('/verify', authorizeUser, verifyUsesr);

export { router as authRouter };
