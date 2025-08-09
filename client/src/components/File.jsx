import dots from '@/assets/assets/icons/dots.svg';
import close from '@/assets/assets/icons/close.svg';
import remove from '@/assets/assets/icons/delete.svg';
import edit from '@/assets/assets/icons/edit.svg';
import { FolderOpen } from 'lucide-react';
import download from '@/assets/assets/icons/download.svg';
import { Download, X } from 'lucide-react';

import { convertFileSize, formatDateTime, getFileIcon } from '@/utils/helpers';
import { useContext, useState } from 'react';
import { mimeToExt } from '@/utils/helpers.js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AppContext } from '@/context/AppContext';

const File = ({
  fileId,
  name,
  createdAt,
  type,
  size,
  imageUrl,
  category,
  fileUrl,
}) => {
  const { renameFile, deleteFile } = useContext(AppContext);
  const [showMenu, setshowMenu] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [showRename, setshowRename] = useState(false);
  const [loading, setloading] = useState(false);
  const [newName, setnewName] = useState('');
  const [showImage, setShowImage] = useState(false);
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
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName || '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rename = async (newName) => {
    setloading(true);
    await renameFile(fileId, newName);
    setloading(false);
    setshowRename(false);
  };
  const deleteIt = async () => {
    setloading(true);
    await deleteFile(fileId, newName);
    setloading(false);
    setshowDelete(false);
  };

  const handleRename = () => {
    setshowMenu(false);
    setshowRename(true);
  };
  const hanldeDelete = () => {
    setshowMenu(false);
    setshowDelete(true);
  };

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
              onClick={() => setShowImage(true)}
              className="w-16 h-16 rounded-full object-cover cursor-pointer"
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
                <div
                  onClick={() => handleRename()}
                  className="flex gap-2 p-3 justify-center items-center  w-full cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <img src={edit} className="w-6 h-6" alt="" />
                  <p className="  cursor-pointer  hover:bg-gray-800 transition-all duration-300">
                    Rename
                  </p>
                </div>
                <div
                  onClick={() => hanldeDelete()}
                  className="flex w-full gap-2 p-3 justify-center items-center cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <img src={remove} className="w-6 h-6" alt="" />
                  <p className="  cursor-pointer  hover:bg-gray-800 transition-all duration-300">
                    Delete
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
              <DialogContent className="bg-gray-700 text-white w-[400px] p-6 rounded-xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl">
                    Rename
                  </DialogTitle>
                  <DialogDescription>
                    <input
                      placeholder="Enter new name"
                      type="text"
                      value={newName}
                      onChange={(e) => setnewName(e.target.value)}
                      className="bg-gray-800 text-white outline-none mt-10 p-3 w-full rounded-full"
                    />
                    <button
                      onClick={() => rename(newName)}
                      className="w-full text-sm text-white cursor-pointer bg-gray-900 mt-5 p-3 rounded-md"
                    >
                      {loading ? 'Renaming ....' : 'Rename'}
                    </button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
      {showDelete && (
        <div className="fixed inset-0 bg-gray-700/10  flex justify-center items-center z-50">
          <div className="rounded-xl shadow-2xl p-6 w-full sm:w-[200px]">
            <Dialog open={showDelete} onOpenChange={setshowDelete}>
              <DialogContent className="bg-gray-700 text-white w-[400px] p-6 rounded-xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl">
                    Delete File
                  </DialogTitle>
                  <DialogDescription>
                    <p className="text-center text-white text-lg">
                      Are you sure to delete {name}
                    </p>
                    <div className="flex justify-center gap-4 items-center">
                      <button
                        onClick={() => deleteIt()}
                        className="w-1/3 text-sm text-white cursor-pointer bg-red-400 mt-5 p-3 rounded-md"
                      >
                        {loading ? 'Removing ....' : 'Delete'}
                      </button>
                      {!loading && (
                        <button
                          onClick={() => setshowDelete(false)}
                          className="w-1/3 text-sm text-black cursor-pointer bg-white mt-5 p-3 rounded-md"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
      {showImage && (
        <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
          <div className="rounded-xl shadow-2xl p-6 w-full flex flex-col items-center justify-center">
            <div className="flex gap-4 mb-5">
              <button className="bg-gray-800 p-3 rounded hover:bg-gray-900 transition cursor-pointer">
                <Download
                  onClick={() =>{ handleDownload(fileUrl, name); setShowImage(false)}}
                  size={24}
                  className="text-white"
                />
              </button>
              <button
                onClick={() => setShowImage(false)}
                className="bg-gray-800 p-3 rounded hover:bg-gray-900 transition cursor-pointer"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <img src={imageUrl} alt="" className=" w-[300px] h-[300px]" />
          </div>
        </div>
      )}
    </>
  );
};

export default File;
