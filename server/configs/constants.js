
export const MAX_STORAGE_BYTES = 1 * 1024 * 1024 * 1024; // 1 GB

// utils/formatStorage.js

export const formatBytesToGB = (bytes, decimals = 2) => {
  const gb = bytes / (1024 ** 3);
  return `${gb.toFixed(decimals)} GB`;
};

export const formatBytesToMB = (bytes, decimals = 2) => {
  const mb = bytes / (1024 ** 2);
  return `${mb.toFixed(decimals)} MB`;
};

