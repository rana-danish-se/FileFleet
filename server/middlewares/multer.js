// utils/multer.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../configs/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'filefleet', 
    resource_type: 'auto', 
  },
});

const upload = multer({ 
  storage, 
  limits: {   fileSize: 100 * 1024 * 1024,  } // 50MB limit
});


export default upload;
