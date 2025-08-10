// utils/getResourceType.js
const getResourceType = (mimetype, extension) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  
  // Everything else goes to 'raw' for proper download handling
  return 'raw';
};

export default getResourceType;