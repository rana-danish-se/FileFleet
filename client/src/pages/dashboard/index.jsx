import React, { useContext, useEffect, useState } from 'react';
import StorageStats from './components/StorageStats';
import filevdeo from '@/assets/assets/icons/file-video.svg';
import document from '@/assets/assets/icons/file-document.svg';
import images from '@/assets/assets/icons/file-image.svg';
import other from '@/assets/assets/icons/file-other.svg';
import StorageCategoryCard from './components/StorageCategoryCard';
import { apiClient } from '@/utils/apiClient';
import { GET_DASHBOARD_ROUTE } from '@/utils/constants';
import { AppContext } from '@/context/AppContext';
import RecentlyUploaded from './components/RecentlyUploaded';
import { toast } from 'sonner';

const Dashboard = () => {
  const { token } = useContext(AppContext);
  const [dashboardData, setdashboardData] = useState(null);
  useEffect(() => {
    const getDashboardData = async () => {
      try {
         const res = await apiClient.get(GET_DASHBOARD_ROUTE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setdashboardData(res.data.summary);
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', error);
      }
    };
    getDashboardData();
  }, []);
  return (
    <div className="px-5 py-3 w-full border  h-full flex ">
      <div className="h-full flex flex-col justify-start items-center  xl:w-[50vw] border">
        <div className="w-full flex items-center justify-center">
          <StorageStats
            used={dashboardData?.usedSpace || '1.00 MB'}
            total={dashboardData?.totalSpace || '1 GB'}
          />
        </div>

        <div className="flex flex-wrap w-full justify-evenly overflow-y-scroll gap-10 mt-6 ">
          <StorageCategoryCard
            icon={document}
            storage={dashboardData?.documents?.size || '0 MB'}
            category="Documents"
            lastUpdated={dashboardData?.documents?.lastUpdated || 'N/A'}
          />
          <StorageCategoryCard
            icon={images}
            storage={dashboardData?.images?.size || '0 MB'}
            category="Images"
            lastUpdated={dashboardData?.images?.lastUpdated || 'N/A'}
          />
          <StorageCategoryCard
            icon={filevdeo}
            storage={dashboardData?.videos_audios?.size || '0 MB'}
            category="Video, Audio"
            lastUpdated={dashboardData?.videos_audios?.lastUpdated || 'N/A'}
          />
          <StorageCategoryCard
            icon={other}
            storage={dashboardData?.others?.size || '0 MB'}
            category="Others"
            lastUpdated={dashboardData?.others?.lastUpdated || 'N/A'}
          />
        </div>
      </div>
      <div>
        <RecentlyUploaded recents={dashboardData?.recent10Uploads}/>
      </div>
    </div>
  );
};

export default Dashboard;
