import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import filePdf from '@/assets/assets/icons/file-pdf.svg?url';
import fileDoc from '@/assets/assets/icons/file-doc.svg?url';
import fileDocx from '@/assets/assets/icons/file-docx.svg?url';
import fileCsv from '@/assets/assets/icons/file-csv.svg?url';
import fileTxt from '@/assets/assets/icons/file-txt.svg?url';
import fileDocument from '@/assets/assets/icons/file-document.svg?url';
import fileImage from '@/assets/assets/icons/file-image.svg?url';
import fileVideo from '@/assets/assets/icons/file-video.svg?url';
import fileAudio from '@/assets/assets/icons/file-audio.svg?url';
import fileOther from '@/assets/assets/icons/file-other.svg?url';
import fileSvg from '@/assets/assets/icons/file-svg.svg';
import filePPt from '@/assets/assets/icons/file-ppt.png';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes, digits) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + ' Bytes';
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + ' KB';
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + ' MB';
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + ' GB';
  }
};

export const calculatePercentage = (sizeInBytes) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (!extension) return { type: 'other', extension: '' };

  const documentExtensions = [
    'pdf',
    'doc',
    'docx',
    'txt',
    'xls',
    'xlsx',
    'csv',
    'rtf',
    'ods',
    'ppt',
    'odp',
    'md',
    'html',
    'htm',
    'epub',
    'pages',
    'fig',
    'psd',
    'ai',
    'indd',
    'xd',
    'sketch',
    'afdesign',
    'afphoto',
  ];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];

  if (documentExtensions.includes(extension))
    return { type: 'document', extension };
  if (imageExtensions.includes(extension)) return { type: 'image', extension };
  if (videoExtensions.includes(extension)) return { type: 'video', extension };
  if (audioExtensions.includes(extension)) return { type: 'audio', extension };

  return { type: 'other', extension };
};

export const formatDateTime = (isoString) => {
  if (!isoString) return '—';

  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? ' pm' : ' am';

  hours = hours % 12 || 12;

  const time = `${hours}:${minutes.toString().padStart(2, '0')}${period}`;
  const day = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

export const mimeToExt = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'pptx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
 

  'text/csv': 'csv',
  'text/plain': 'txt',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/svg+xml': 'svg',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/x-matroska': 'mkv',
  'video/quicktime': 'mov',
  'video/x-msvideo': 'avi',
  'video/x-ms-wmv': 'wmv',
  'video/x-flv': 'flv',
  'video/x-m4v': 'm4v',
  'video/3gpp': '3gp',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'audio/aac': 'aac',
  'audio/flac': 'flac',
  'audio/ogg': 'ogg',
  'audio/x-ms-wma': 'wma',
  'audio/x-m4a': 'm4a',
  'audio/mp4': 'm4a',
  'audio/aiff': 'aiff',
  'audio/alac': 'alac',
};

export const getFileIcon = (extension, type) => {
  // Normalize MIME types to extensions
  if (extension && extension.includes('/')) {
    extension = mimeToExt[extension] || '';
  }

  // If still not matched and looks like MIME without slash, try mapping
  if (!extension && mimeToExt[type]) {
    extension = mimeToExt[type];
  }
  if (type && type.includes('.')) {
    type = type.split('.').pop().toLowerCase();
  }
  switch (extension) {
    case 'pdf':
      return filePdf;
    case 'ppt':
      return filePPt;
    case 'pptx':
      return filePPt;
    case 'doc':
      return fileDoc;
    case 'docx':
      return fileDocx;
    case 'csv':
      return fileCsv;
    case 'txt':
      return fileTxt;
    case 'xls':
    case 'xlsx':
      return fileDocument;
    case 'svg':
      return fileSvg;
    case 'mkv':
    case 'mov':
    case 'avi':
    case 'wmv':
    case 'mp4':
    case 'flv':
    case 'webm':
    case 'm4v':
    case '3gp':
      return fileVideo;
    case 'mp3':
    case 'mpeg':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'ogg':
    case 'wma':
    case 'm4a':
    case 'aiff':
    case 'alac':
      return fileAudio;
    default:
      switch (type) {
        case 'image':
          return fileImage;
        case 'document':
          return fileDocument;
        case 'video':
          return fileVideo;
        case 'audio':
          return fileAudio;
        default:
          return fileOther;
      }
  }
};
