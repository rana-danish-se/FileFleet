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
import { apiClient } from '@/utils/apiClient';
import { toast } from 'sonner';

const File = ({
  fileId,
  name,
  originalName,
  publicId,
  resourceType,
  extension,
  createdAt,
  type,
  size,
  imageUrl,
  category,
  fileUrl,
}) => {
  const { renameFile, deleteFile, token } = useContext(AppContext);
  const [showMenu, setshowMenu] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [showRename, setshowRename] = useState(false);
  const [loading, setloading] = useState(false);
  const [newName, setnewName] = useState('');
  const [showImage, setShowImage] = useState(false);

  const openFileAlternative = async (url, mimeType, fileName, fileId) => {
    const ext =
      mimeToExt[mimeType] ||
      (fileName?.includes('.')
        ? fileName.split('.').pop().toLowerCase()
        : '') ||
      'unknown';

    let handled = false;

    try {
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
          handled = true;
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
          handled = true;
          break;
      }

      // If not handled above, try opening directly
      if (!handled) {
        const newTab = window.open(url, '_blank');
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          // Popup blocked → fallback to download
          const userWantsDownload = window.confirm(
            `Cannot preview ${fileName}. Would you like to download it instead?`
          );
          if (userWantsDownload) {
            await handleDownload(fileId, fileName);
          }
        }
      }
    } catch (err) {
      console.log(err);
      const userWantsDownload = window.confirm(
        `Error opening ${fileName}. Would you like to download it instead?`
      );
      if (userWantsDownload) {
        await handleDownload(fileId, fileName);
      }
    }
  };

  // FIXED: Unified preview function
  const openFile = async (fileId, fileName, mimeType) => {
    try {
      // FIXED: Added /api to the URL
      const response = await apiClient.get(
        `/api/files/access/${fileId}/preview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const { accessUrl, canPreview } = response.data;

        if (canPreview) {
          window.open(accessUrl, '_blank');
        } else {
          await openFileAlternative(fileUrl, mimeType, fileName, fileId);
        }
      } else {
        toast.error('Failed to open file');
        console.error('Failed to get file access URL:', response.data.message);
      }
    } catch (error) {
      console.error('Error opening file:', error);
      // Fallback to direct URL for images if API fails
      if (type.startsWith('image/')) {
        window.open(fileUrl, '_blank');
      } else {
        toast.error('Error opening file');
      }
    }
  };

  const handleDownload = async (fileId, fileName) => {
    let toastId;
    try {
      console.log('Starting download for:', fileName);

      // Initial toast
      toastId = toast.loading('Preparing download...', {
        duration: Infinity,
      });

      // Get download URL from backend
      const response = await apiClient.get(
        `/api/files/access/${fileId}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const { accessUrl } = response.data;
        console.log('Download URL received:', accessUrl);

        // Update toast
        toast.loading('Starting download...', {
          id: toastId,
        });

        // Download file with progress tracking
        const downloadResponse = await fetch(accessUrl);

        if (!downloadResponse.ok) {
          throw new Error(`Download failed: ${downloadResponse.status}`);
        }

        const contentLength = downloadResponse.headers.get('content-length');
        const total = parseInt(contentLength, 10);
        let loaded = 0;

        // Create a readable stream to track progress
        const reader = downloadResponse.body.getReader();
        const stream = new ReadableStream({
          start(controller) {
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }

                loaded += value.length;

                // Calculate progress
                const progress = total ? Math.round((loaded / total) * 100) : 0;
                const loadedMB = (loaded / 1024 / 1024).toFixed(1);
                const totalMB = total
                  ? (total / 1024 / 1024).toFixed(1)
                  : 'Unknown';

                // Update toast with progress
                toast.loading(
                  `Downloading... ${progress}% (${loadedMB}/${totalMB} MB)`,
                  {
                    id: toastId,
                  }
                );

                controller.enqueue(value);
                return pump();
              });
            }
            return pump();
          },
        });

        // Convert stream to blob
        const blob = await new Response(stream).blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'download';
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();

        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);

        // Success toast
        toast.success(`${fileName} downloaded successfully! 🎉`, {
          id: toastId,
          duration: 3000,
        });
      } else {
        console.error('Download failed:', response.data.message);
        toast.error('Failed to prepare download', {
          id: toastId,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Download error:', error);

      let errorMessage = 'Download failed';
      if (error.name === 'TypeError') {
        errorMessage = 'Network error - check your connection';
      } else if (error.message.includes('401')) {
        errorMessage = 'Authentication failed - please login again';
      } else if (error.message.includes('403')) {
        errorMessage = 'Access denied - insufficient permissions';
      } else if (error.message.includes('404')) {
        errorMessage = 'File not found or has been deleted';
      }

      toast.error(errorMessage, {
        id: toastId,
        duration: 5000,
      });
    }
  };

  const rename = async (newName) => {
    setloading(true);
    await renameFile(fileId, newName);
    setloading(false);
    setshowRename(false);
  };

  const deleteIt = async () => {
    setloading(true);
    await deleteFile(fileId);
    setloading(false);
    setshowDelete(false);
  };

  const handleRename = () => {
    setshowMenu(false);
    setshowRename(true);
  };

  const handleDelete = () => {
    setshowMenu(false);
    setshowDelete(true);
  };

  // FIXED: Simplified image check
  const isImage = type.startsWith('image/');

  return (
    <>
      <div className="flex flex-col p-6 bg-gray-700 shadow-2xl rounded-lg sm:w-[250px] w-full">
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
              <div className="bg-gray-900 w-[150px] items-start justify-start flex flex-col gap-2 absolute top-2 right-6">
                {/* FIXED: Simplified open logic */}
                <div
                  onClick={() => {
                    setshowMenu(false); // Close menu first
                    if (isImage) {
                      setShowImage(true);
                    } else {
                      openFile(fileId, name, type);
                    }
                  }}
                  className="flex gap-4 w-full p-3 justify-center items-start cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <FolderOpen className="w-4 h-5" />
                  <p className="cursor-pointer hover:bg-gray-800 transition-all duration-300">
                    Open
                  </p>
                </div>

                <div
                  onClick={() => handleRename()}
                  className="flex gap-2 p-3 justify-center items-center w-full cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <img src={edit} className="w-6 h-6" alt="" />
                  <p className="cursor-pointer hover:bg-gray-800 transition-all duration-300">
                    Rename
                  </p>
                </div>

                <div
                  onClick={() => handleDelete()}
                  className="flex w-full gap-2 p-3 justify-center items-center cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <img src={remove} className="w-6 h-6" alt="" />
                  <p className="cursor-pointer hover:bg-gray-800 transition-all duration-300">
                    Delete
                  </p>
                </div>

                {/* FIXED: Download button */}
                <div
                  onClick={async () => {
                    setshowMenu(false);
                    await handleDownload(fileId, name);
                  }}
                  className="flex gap-2 p-3 justify-center w-full items-center cursor-pointer hover:bg-gray-800 transition-all duration-300"
                >
                  <img src={download} className="w-6 h-6" alt="" />
                  <p className="cursor-pointer hover:bg-gray-800 transition-all duration-300">
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

      {/* Rename Dialog */}
      {showRename && (
        <div className="fixed inset-0 bg-gray-700/10 flex justify-center items-center z-50">
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

      {/* Delete Dialog */}
      {showDelete && (
        <div className="fixed inset-0 bg-gray-700/10 flex justify-center items-center z-50">
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

      {/* FIXED: Image Modal */}
      {showImage && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="rounded-xl shadow-2xl p-6 w-full flex flex-col items-center justify-center">
            <div className="flex gap-4 mb-5">
              {/* FIXED: Download button in image modal */}
              <button
                onClick={async () => {
                  await handleDownload(fileId, name);
                  setShowImage(false);
                }}
                className="bg-gray-800 p-3 rounded hover:bg-gray-900 transition cursor-pointer"
              >
                <Download size={24} className="text-white" />
              </button>

              <button
                onClick={() => setShowImage(false)}
                className="bg-gray-800 p-3 rounded hover:bg-gray-900 transition cursor-pointer"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <img
              src={fileUrl}
              alt={name}
              className="w-[300px] h-[300px] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default File;
