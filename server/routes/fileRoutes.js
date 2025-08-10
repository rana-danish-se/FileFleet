import express from 'express';
import {
  getStorageSummaryController,
  uploadFilesController,
  getDocumentsController,
  getImagesController,
  getVideosAudiosController,
  getOthersController,
  renameFile,
  deleteFile,
  getFileAccessController, // Add this new import
} from '../controllers/fileController.js';

import upload from '../middlewares/multer.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const fileRouter = express.Router();


fileRouter.post(
  '/upload',
  verifyToken,
  (req, res, next) => {
    upload.array('files')(req, res, function (err) {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({
            success: false,
            message: 'File too large. Max allowed size is 100MB.',
          });
        }

        // Handle other multer errors
        return res.status(400).json({
          success: false,
          message: 'Upload failed',
          error: err.message,
        });
      }
      next(); 
    });
  },
  uploadFilesController
);

fileRouter.get('/access/:fileId/:action', verifyToken, getFileAccessController);

// Existing routes
fileRouter.get('/get-dashboard', verifyToken, getStorageSummaryController);
fileRouter.get('/documents', verifyToken, getDocumentsController);
fileRouter.get('/images', verifyToken, getImagesController);
fileRouter.get('/media', verifyToken, getVideosAudiosController);
fileRouter.get('/others', verifyToken, getOthersController);
fileRouter.post('/rename-file', verifyToken, renameFile);
fileRouter.post('/delete-file', verifyToken, deleteFile);

export default fileRouter;