import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/AppContext';
import { apiClient } from '@/utils/apiClient';
import { GET_USER_INFO } from '@/utils/constants';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // ✅ Import this

const DashboardLayout = () => {
  const { setUserInfo, token } = useContext(AppContext);

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
    <div className="flex h-screen w-[100vw] bg-gray-950 text-white">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="w-full   overflow-scroll bg-gray-800">
          <div className="w-full min-h-screen  bg-gray-800 rounded-lg">
            <Outlet /> {/* ✅ This replaces {children} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
