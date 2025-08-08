// utils/getCategory.js
const getCategory = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';

  // Document formats
  if (
    mimetype === 'application/pdf' ||
    mimetype.includes('msword') ||
    mimetype.includes('officedocument') ||
    mimetype === 'text/csv' ||
    mimetype === 'application/vnd.ms-excel' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimetype === 'application/vnd.sketch' || // Sketch files
    mimetype.includes('vnd.adobe.xd') || // Adobe XD
    mimetype.includes('figma') // Figma (custom mimetype if available)
  ) {
    return 'document';
  }

  if (mimetype.startsWith('audio/')) return 'audio';
  return 'other';
};

export default getCategory;
