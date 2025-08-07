// utils/getCategory.js
const getCategory = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype === 'application/pdf') return 'document';
  if (mimetype.includes('msword') || mimetype.includes('officedocument')) return 'document';
  if (mimetype.startsWith('audio/')) return 'audio';
  return 'other';
};

export default getCategory;
