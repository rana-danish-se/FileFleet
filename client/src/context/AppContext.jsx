import { apiClient } from '@/utils/apiClient';
import {
  DELETE_FILE_ROUTE,
  GET_DOCUMENTS_ROUTE,
  GET_IMAGES_ROUTE,
  GET_MEDIA_ROUTE,
  GET_OTHERS_ROUTE,
  RENAME_FILE_ROUTE,
  VERIFY_OTP_ROUTE,
} from '@/utils/constants';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UPLOAD_FILES_ROUTE } from '@/utils/constants';
import { GET_DASHBOARD_ROUTE } from '@/utils/constants';

import { toast } from 'sonner';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [others, setOthers] = useState(null);
  const [othersSize, setOthersSize] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaSize, setMediaSize] = useState(null);
  const [images, setImages] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [dashboardData, setdashboardData] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [docsSize, setDocsSize] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [state, setState] = useState('Login');
  const [token, setToken] = useState(null);
  const [userId, setuserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getTotalSizeMB = (files) => {
    const totalBytes = Array.from(files).reduce(
      (acc, file) => acc + file.size,
      0
    );
    return (totalBytes / (1024 * 1024)).toFixed(2);
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const totalSizeMB = getTotalSizeMB(files);
    const toastId = toast(
      `Uploading ${files.length} files (0%) of ${totalSizeMB} MB...`,
      {
        duration: Infinity,
      }
    );

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    try {
      const response = await apiClient.post(UPLOAD_FILES_ROUTE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded / total) * 100);
          toast.message(`Uploading ${files.length} files (${percent}%)...`, {
            id: toastId,
          });
        },
      });

      if (response.status === 200) {
        toast.success('Files uploaded successfully ✅', {
          id: toastId,
          duration: 2000,
        });
        refreshData();
      } else {
        toast.error(response.data.message || 'Failed to upload files ❌', {
          id: toastId,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error.response?.data?.message || 'Upload failed ❌', {
        id: toastId,
        duration: 5000,
      });
    }
  };

  const verifyOTP = async (otp, userId) => {
    try {
      const res = await apiClient.post(VERIFY_OTP_ROUTE, { otp, userId });
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUserInfo(res.data.user);
        navigate('/dashboard');
      } else {
        toast.error(res.data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(error.response?.data?.message || 'Failed to verify OTP');
    }
  };

  const getDashboardData = async () => {
    try {
      const res = await apiClient.get(GET_DASHBOARD_ROUTE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setdashboardData(res.data.summary);
      } else {
        toast.error(res.data.message || 'Failed to fetch dashboard data');
        navigate('/auth');
      }
    } catch (error) {
      toast.error(error.res.data.message || 'Failed to fetch dashboard data');
      navigate('/auth');
      console.error('Dashboard data fetch error:', error);
    }
  };

  const getDocs = async () => {
    try {
      const res = await apiClient.get(GET_DOCUMENTS_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setDocuments(res.data.files);
        setDocsSize(res.data.totalSize);
      }
    } catch (error) {
      toast.error('Failed to fetch documents');
    }
  };

  const getImages = async () => {
    try {
      const res = await apiClient.get(GET_IMAGES_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setImages(res.data.files);
        setImageSize(res.data.totalSize);
      }
    } catch (error) {
      toast.error('Failed to fetch images');
    }
  };

  const getMedia = async () => {
    try {
      const res = await apiClient.get(GET_MEDIA_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setMedia(res.data.files);
        setMediaSize(res.data.totalSize);
      }
    } catch (error) {
      toast.error('Failed to fetch documents');
    }
  };

  const getOthers = async () => {
    try {
      const res = await apiClient.get(GET_OTHERS_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setOthers(res.data.files);
        setOthersSize(res.data.totalSize);
      }
    } catch (error) {
      toast.error('Failed to fetch documents');
    }
  };

  const renameFile = async (fileId, newName) => {
    try {
      const res = await apiClient.post(
        RENAME_FILE_ROUTE,
        { fileId, newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        refreshData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };
  const deleteFile=async(fileId)=>{
     try {
      const res = await apiClient.post(
        DELETE_FILE_ROUTE,
        { fileId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        refreshData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.res.data.message);
    }
  }
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) setToken(storedToken);
  }, []);

  const refreshData = () => {
    if (location.pathname === '/dashboard') {
      getDashboardData();
    } else if (location.pathname === '/dashboard/documents') {
      getDocs();
    } else if (location.pathname === '/dashboard/images') {
      getImages();
    } else if (location.pathname === '/dashboard/media') {
      getMedia();
    } else if (location.pathname === '/dashboard/others') {
      getOthers();
    }
  };

  // Optional: Sync to localStorage whenever token/userInfo changes
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
  }, [token]);

  const value = {
    userInfo,
    setUserInfo,
    token,
    setToken,
    verifyOTP,
    state,
    setState,
    userId,
    setuserId,
    navigate,
    handleFileChange,
    dashboardData,
    getDashboardData,
    documents,
    getDocs,
    docsSize,
    images,
    getImages,
    imageSize,
    getMedia,
    media,
    mediaSize,
    getOthers,
    others,
    othersSize,
    renameFile,
    deleteFile
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
