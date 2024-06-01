import express from 'express';

import {
  generateImage,
  editImageUsingImage,
} from '../controllers/imageController.js';
import { upload } from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/generate', generateImage);
router.post('/edit', upload, editImageUsingImage);

export { router as imageRouter };
