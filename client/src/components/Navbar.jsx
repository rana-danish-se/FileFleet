import React, { useContext, useRef } from 'react';
import search from '@/assets/assets/icons/search.svg';
import upload from '@/assets/assets/icons/upload.svg';
import logout from '@/assets/assets/icons/logout.svg';
import { AppContext } from '@/context/AppContext';

const Navbar = () => {
  const { token, setToken, setUserInfo, handleFileChange } =
    useContext(AppContext);
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

  return (
    <div className="p-3 sm:ml-13 flex items-center justify-end">
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
