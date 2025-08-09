import { getFileIcon, mimeToExt } from '@/utils/helpers';
import download from '@/assets/assets/icons/download.svg';
import { toast } from 'sonner';
import { useEffect } from 'react';

const formatFileSize = (bytes) => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${bytes} B`;
};

const RecentlyUploaded = ({ recents = [] }) => {
  const openFile = (url, mimeType) => {
    const ext = mimeToExt[mimeType] || 'unknown';

    switch (ext) {
      // Open directly in browser
      case 'pdf':
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
      case 'gif':
      case 'mp4':
      case 'webm':
      case 'mkv':
      case 'mov':
      case 'avi':
      case 'wmv':
      case 'mp3':
      case 'wav':
      case 'ogg':
      case 'aac':
      case 'flac':
        window.open(url, '_blank');
        break;

      // Docs & spreadsheets → Google Docs viewer
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
      case 'csv':
      case 'txt':
        window.open(
          `https://docs.google.com/viewer?url=${encodeURIComponent(
            url
          )}&embedded=true`,
          '_blank'
        );
        break;

      default:
        // Download unknown types
        const a = document.createElement('a');
        a.href = url;
        a.download = url.split('/').pop();
        a.click();
    }
  };
  const handleDownload = async (fileUrl, fileName) => {
    try {
      // Show a toast or loader
      toast.info('Downloading...');

      // Fetch file as a blob
      const response = await fetch(fileUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName || 'downloaded-file';
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      toast.success('Download complete ✅');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file ❌');
    }
  };

  useEffect(()=>{
console.log(recents)
  },[])
  if (recents.length === 0) {
    return (
      <p className="text-lg mt-10 uppercase  text-white">No recent uploads</p>
    );
  }

  return (
    <div className="w-full bg-gray-900 p-5 mt-6 rounded-md">
      <h3 className="text-lg font-semibold mb-3">Recent files uploaded</h3>
      <div className="grid gap-4 max-h-[100vh] overflow-y-scroll">
        {recents.map((file, index) => (
          <div
            key={file._id || index}
            className=" p-3 rounded-lg shadow-sm   bg-gray-800  flex items-center justify-between gap-1"
          >
            <div
              onClick={() => openFile(file.url, file.type)}
              className="flex items-center cursor-pointer  gap-5 justify-center rounded-full"
            >
              <div className="w-14 h-14 rounded-full bg-gray-600  flex items-center justify-center">
                <img
                  src={file.url&&file.category==="image"?file.url:getFileIcon(file.type, file.name)}
                  className="w-10 h-10 rounded-full "
                  alt=""
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold">{file.name}</h4>
                <p className="text-xs text-gray-400">
                  {new Date(file.createdAt).toLocaleDateString()} -{' '}
                  {new Date(file.createdAt).toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-300">
                  Size: {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <img
              onClick={() => handleDownload(file.url, file.name)}
              src={download}
              alt=""
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyUploaded;
