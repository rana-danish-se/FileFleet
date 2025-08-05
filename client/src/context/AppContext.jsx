import { apiClient } from '@/utils/apiClient';
import { VERIFY_OTP_ROUTE } from '@/utils/constants';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [state, setState] = useState('Login');
  const [token, setToken] = useState(null);
  const [userId, setuserId] = useState(null);
  const navigate = useNavigate();
  const verifyOTP = async (otp, userId) => {
    try {
      const res = await apiClient.post(VERIFY_OTP_ROUTE, { otp, userId });
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUserInfo(res.data.user);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load from localStorage on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) setToken(storedToken);
  }, []);

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
    navigate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
