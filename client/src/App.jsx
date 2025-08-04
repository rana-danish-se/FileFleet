import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';

import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';

import DashboardLayout from './layouts/DashbaordLayout';
import { apiClient } from './utils/apiClient';
import { GET_USER_INFO } from './utils/constants';
import VerifyEmail from './pages/auth/components/Verification';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useContext(AppContext);
  const isAuthenticated = !!userInfo;

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  if(!userInfo.isVerified){
       return <Navigate to="/verify-email" />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useContext(AppContext);
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function App() {
  const { token, setUserInfo } = useContext(AppContext);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!token) return;

      try {
        const res = await apiClient.get(GET_USER_INFO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setUserInfo(res.data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        localStorage.clear();
      }
    };

    getUserInfo();
  }, [token]);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <div>Dashboard</div>
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}

export default App;
