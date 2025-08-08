import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import DashboardLayout from './layouts/DashbaordLayout';

import VerifyEmail from './pages/auth/components/Verification';
import ResetPassword from './pages/auth/components/ResetPassword';
import Dashboard from './pages/dashboard';
import Documents from './pages/dashboard/documents';
import Images from './pages/dashboard/images';
import Media from './pages/dashboard/media';
import Others from './pages/dashboard/others';

// Import new category pages

const PrivateRoute = ({ children }) => {
  const { token, userInfo } = useContext(AppContext);
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  if (userInfo && !userInfo.isVerified) {
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

      {/* Nested routes inside DashboardLayout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="documents" element={<Documents />} />
        <Route path="images" element={<Images />} />
        <Route path="media" element={<Media />} />
          <Route path="others" element={<Others />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}

export default App;
