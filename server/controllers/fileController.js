import File from '../models/fileModel.js';
import getCategory from '../utils/getCategory.js';
import User from '../models/userModel.js';
import { formatBytesToGB, formatBytesToMB, MAX_STORAGE_BYTES } from '../configs/constants.js';
import { format } from 'date-fns'; 


export const uploadFilesController = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No files uploaded' });
    }

    const user = await User.findById(req.userId);
    if (!user)
      return res.status(404).json({ sucess: false, message: 'User not found' });

    const totalUploadSize = files.reduce((acc, file) => acc + file.size, 0);
    const projectedUsage = user.usedStorage + totalUploadSize;

    if (projectedUsage > MAX_STORAGE_BYTES) {
      return res.status(400).json({
        success: false,
        message: 'Upload failed: Storage limit exceeded (1GB)',
      });
    }

    const uploadedFiles = [];

    for (const file of files) {
      if (file.size > 100 * 1024 * 1024) {
        return res.status(413).json({
          success: false,
          message: `File "${file.originalname}" exceeds 100MB limit.`,
        });
      }
      const category = getCategory(file.mimetype);
      const newFile = new File({
        name: file.originalname,
        url: file.path, // Cloudinary URL
        type: file.mimetype,
        size: file.size,
        category,
        owner: req.userId,
      });

      await newFile.save();
      uploadedFiles.push(newFile);
    }
    console.log('Uploaded files:', uploadedFiles);
    // Update user's usedStorage
    user.usedStorage += totalUploadSize;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Something went wrong during upload' });
  }
};






export const getStorageSummaryController = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({success:false, message: 'User not found' });

    const files = await File.find({ owner: userId }).sort({ createdAt: -1 });

    const recent10Uploads = files.slice(0, 10);

    const summary = {
      totalSpace: formatBytesToGB(MAX_STORAGE_BYTES),
      usedSpace: formatBytesToMB(user.usedStorage),
      recent10Uploads,
      documents: { size: 0, lastUpdated: null },
      images: { size: 0, lastUpdated: null },
      videos_audios: { size: 0, lastUpdated: null },
      others: { size: 0, lastUpdated: null },
    };

    for (const file of files) {
      const category = file.category.toLowerCase();
      const lastUpdated = format(new Date(file.createdAt), 'hh:mm a, dd MMM');

      if (category === 'document') {
        summary.documents.size += file.size;
        if (!summary.documents.lastUpdated) summary.documents.lastUpdated = lastUpdated;
      } else if (category === 'image') {
        summary.images.size += file.size;
        if (!summary.images.lastUpdated) summary.images.lastUpdated = lastUpdated;
      } else if (category === 'video' || category === 'audio') {
        summary.videos_audios.size += file.size;
        if (!summary.videos_audios.lastUpdated) summary.videos_audios.lastUpdated = lastUpdated;
      } else {
        summary.others.size += file.size;
        if (!summary.others.lastUpdated) summary.others.lastUpdated = lastUpdated;
      }
    }

    // Format category sizes to MB
    summary.documents.size = formatBytesToMB(summary.documents.size);
    summary.images.size = formatBytesToMB(summary.images.size);
    summary.videos_audios.size = formatBytesToMB(summary.videos_audios.size);
    summary.others.size = formatBytesToMB(summary.others.size);

    res.status(200).json({success:true,summary});
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Failed to fetch storage summary' });
  }
};

