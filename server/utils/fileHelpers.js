import File from '../models/FileModel.js';
import { formatBytesToMB } from './formatStorage.js';

export const getFilesByCategory = async (userId, categories) => {
  const query = {
    owner: userId,
    category: Array.isArray(categories) ? { $in: categories } : categories,
  };

  const files = await File.find(query).sort({ createdAt: -1 });

  const totalSizeBytes = files.reduce((acc, file) => acc + file.size, 0);
  const totalSize = formatBytesToMB(totalSizeBytes);

  return { files, totalSize };
};
