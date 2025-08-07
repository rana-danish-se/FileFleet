import React, { useContext, useRef } from 'react';
import search from '@/assets/assets/icons/search.svg';
import upload from '@/assets/assets/icons/upload.svg';
import logout from '@/assets/assets/icons/logout.svg';
import { AppContext } from '@/context/AppContext';
import { toast } from 'sonner';
import axios from 'axios';
import { apiClient } from '@/utils/apiClient';
import { UPLOAD_FILES_ROUTE } from '@/utils/constants';

const Navbar = () => {
  const { token, setToken, setUserInfo } = useContext(AppContext);
  const fileRef = useRef(null);

  const handleLogOut = () => {
    localStorage.clear();
    setToken(null);
    setUserInfo(null);
    window.location.href = '/login';
  };

  const handleUploadButtonClick = () => {
    fileRef.current.click();
  };

  const getCategory = (type) => {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type.startsWith('application/')) return 'document';
    return 'other';
  };

  const getTotalSizeMB = (files) => {
    const totalBytes = Array.from(files).reduce(
      (acc, file) => acc + file.size,
      0
    );
    return (totalBytes / (1024 * 1024)).toFixed(2); // in MB
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const totalSizeMB = getTotalSizeMB(files);
    toast.info(`Uploading ${files.length} files (${totalSizeMB} MB)...`);

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    try {
      const response = await apiClient.post(
        UPLOAD_FILES_ROUTE,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded / total) * 100);
            console.log(`Upload progress: ${percent}%`);
          },
        }
      );
      console.log(response);
      toast.success(response.data.message || 'Files uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="p-3 sm:ml-13 flex items-center justify-between">
      <div className="bg-gray-900 gap-2 sm:flex items-center justify-between px-4 py-2 rounded-full">
        <img src={search} alt="" />
        <input
          type="text"
          className="flex flex-1 border-none outline-none"
          placeholder="Search for file"
        />
      </div>

      <div className="flex items-center gap-4 cursor-pointer">
        <button
          onClick={handleUploadButtonClick}
          className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-200"
        >
          <img src={upload} alt="" />
          Upload
        </button>

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />

        <img
          src={logout}
          alt=""
          className="cursor-pointer"
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
};

export default Navbar;
