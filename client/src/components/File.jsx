import dots from '@/assets/assets/icons/dots.svg';
import close from '@/assets/assets/icons/close.svg';
import share from '@/assets/assets/icons/share.svg';
import remove from '@/assets/assets/icons/delete.svg';
import edit from '@/assets/assets/icons/edit.svg';
import { FolderOpen } from 'lucide-react';
import download from '@/assets/assets/icons/download.svg';
import { convertFileSize, formatDateTime, getFileIcon } from '@/utils/helpers';
import { useState } from 'react';
import { mimeToExt } from '@/utils/helpers.js';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const File = ({ name, createdAt, type, size, imageUrl, category, fileUrl }) => {
  const [showMenu, setshowMenu] = useState(false);
  const [showRename, setshowRename] = useState(false);
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

  const handleRename=()=>{
    setshowRename(true);
  }

  return (
    <>
      <div className=" flex  flex-col p-6 bg-gray-700 shadow-2xl rounded-lg sm:w-[250px] w-full">
        <div className="flex justify-between items-center">
          {!imageUrl ? (
            <img
              src={getFileIcon(type, category)}
              alt=""
              className="w-14 h-14"
            />
          ) : (
            <img
              src={imageUrl}
              className="w-16 h-16 rounded-full object-cover"
              alt=""
            />
          )}
          <div className="flex relative flex-col items-end gap-2">
            {showMenu ? (
              <img
                src={close}
                className="w-6 h-6 cursor-pointer"
                alt=""
                onClick={() => setshowMenu(false)}
              />
            ) : (
              <img
                className="w-8 h-8 cursor-pointer"
                src={dots}
                alt=""
                onClick={() => setshowMenu(true)}
              />
            )}

            <p className="text-xs">{convertFileSize(size, 1)}</p>
            {showMenu && (
              <div className="bg-gray-900   w-[150px] items-start justify-start   flex flex-col gap-2 absolute top-2 right-6">
                <div
                  onClick={() => openFile(fileUrl ? fileUrl : imageUrl, type)}
                  className="flex gap-4 w-full p-3 justify-center items-start  cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <FolderOpen className="w-4 h-5" />
                  <p className="  cursor-pointer  hover:bg-gray-800 transition-all duration-300">
                    Open
                  </p>
                </div>
                <div onClick={()=>handleRename()} className="flex gap-2 p-3 justify-center items-center  w-full cursor-pointer hover:bg-gray-800 transition-all duration-300">
                  <img src={edit} className="w-6 h-6" alt="" />
                  <p className="  cursor-pointer  hover:bg-gray-800 transition-all duration-300">
                    Rename
                  </p>
                </div>
                <div className="flex w-full gap-2 p-3 justify-center items-center cursor-pointer hover:bg-gray-800 transition-all duration-300">
                  <img src={remove} className="w-6 h-6" alt="" />
                  <p className="  cursor-pointer  hover:bg-gray-800 transition-all duration-300">
                    Delete
                  </p>
                </div>
                <div className="flex w-full gap-2 p-3 justify-center items-center cursor-pointer hover:bg-gray-800 transition-all duration-300">
                  <img src={share} className="w-6 h-6" alt="" />
                  <p className="  cursor-pointer  hover:bg-gray-800 transition-all duration-300">
                    Share
                  </p>
                </div>
                <div
                  onClick={() => handleDownload(fileUrl, name)}
                  className="flex gap-2 p-3 justify-center w-full items-center cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <img src={download} className="w-6 h-6" alt="" />
                  <p className="  cursor-pointer  hover:bg-gray-800 transition-all duration-300">
                    Download
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5 items-start">
          <h4 className="text-sm font-semibold">{name}</h4>
          <h6 className="text-xs text-slate-400">
            {formatDateTime(createdAt)}
          </h6>
        </div>
      </div>

      {showRename && (
        <div className="fixed inset-0 bg-gray-700/10  flex justify-center items-center z-50">
          <div className="rounded-xl shadow-2xl p-6 w-full sm:w-[200px]">
<Dialog open={showRename} onOpenChange={setshowRename}>
  <DialogContent
    className="bg-gray-700 text-white w-[400px] p-6 rounded-xl shadow-2xl"
  >
    <DialogHeader>
      <DialogTitle className="text-center text-xl">Rename</DialogTitle>
      <DialogDescription>
        <input
          placeholder="Enter new name"
          type="text"
          className="bg-gray-800 text-white outline-none mt-10 p-3 w-full rounded-full"
        />
        <button className="w-full text-sm text-white cursor-pointer bg-gray-900 mt-5 p-3 rounded-md">
          Rename
        </button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

          </div>
        </div>
      )}
    </>
  );
};

export default File;
