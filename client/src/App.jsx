import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';

import { useContext } from 'react';
import { AppContext } from './context/AppContext';

import DashboardLayout from './layouts/DashbaordLayout';

import { GET_USER_INFO } from './utils/constants';
import VerifyEmail from './pages/auth/components/Verification';
import ResetPassword from './pages/auth/components/ResetPassword';

const PrivateRoute = ({ children }) => {
  const { token ,userInfo} = useContext(AppContext);
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  if(userInfo&&!userInfo.isVerified){
       return <Navigate to="/verify-email" />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  const isAuthenticated = !!token;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function App() {




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
      <Route path="/reset-password" element={<ResetPassword />} />
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
