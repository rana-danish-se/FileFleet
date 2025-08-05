import { AppContext } from "@/context/AppContext";
import { apiClient } from "@/utils/apiClient";
import { GET_USER_INFO } from "@/utils/constants";
import { useContext, useEffect } from "react";

// layouts/DashboardLayout.jsx
const DashboardLayout = ({ children }) => {
  const {userInfo,setUserInfo,token}=useContext(AppContext);
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="/dashboard" className="hover:underline">Profile</a></li>
            <li><a href="/dashboard/files" className="hover:underline">My Files</a></li>
            {/* Add more links */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
