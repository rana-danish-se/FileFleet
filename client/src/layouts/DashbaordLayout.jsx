import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";

// layouts/DashboardLayout.jsx
const DashboardLayout = ({ children }) => {
  const {userInfo}=useContext(AppContext);
  useEffect(()=>{
  console.log(userInfo)
  },[])
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
