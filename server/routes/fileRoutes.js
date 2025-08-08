import express from 'express';
import {
  getStorageSummaryController,
  uploadFilesController,
  getDocumentsController,
  getImagesController,
  getVideosAudiosController,
  getOthersController,
} from '../controllers/fileController.js';

import upload from '../middlewares/multer.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const fileRouter = express.Router();

// POST /api/files/upload - upload one or more files
fileRouter.post(
  '/upload',
  verifyToken, // Ensure user is authenticated
  (req, res, next) => {
    upload.array('files')(req, res, function (err) {
      if (err) {
        // 👇 Handle Multer file size limit error
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({
            success: false,
            message: 'File too large. Max allowed size is 100MB.',
          });
        }

        // 👇 Handle other multer errors
        return res.status(400).json({
          success: false,
          message: 'Upload failed',
          error: err.message,
        });
      }
      next(); // Proceed to controller
    });
  },

  uploadFilesController
);

fileRouter.get('/get-dashboard', verifyToken, getStorageSummaryController);
fileRouter.get('/documents', verifyToken, getDocumentsController);
fileRouter.get('/images', verifyToken, getImagesController);
fileRouter.get('/media', verifyToken, getVideosAudiosController);
fileRouter.get('/others', verifyToken, getOthersController);

export default fileRouter;
