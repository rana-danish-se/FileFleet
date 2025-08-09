// utils/multer.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../configs/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Detect SVGs or text-based files and upload them as raw
    if (
      file.mimetype === 'image/svg+xml' ||
      file.mimetype.startsWith('text/')
    ) {
      return {
        folder: 'filefleet',
        resource_type: 'raw', // Avoid image processing, keep file as-is
        format: file.originalname.split('.').pop(), // Preserve extension
      };
    }

    // For other files, auto works fine
    return {
      folder: 'filefleet',
      resource_type: 'auto',
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

export default upload;
