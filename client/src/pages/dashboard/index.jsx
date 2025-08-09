import React, { useContext, useEffect, useState } from 'react';
import StorageStats from './components/StorageStats';
import filevdeo from '@/assets/assets/icons/file-video.svg';
import document from '@/assets/assets/icons/file-document.svg';
import images from '@/assets/assets/icons/file-image.svg';
import other from '@/assets/assets/icons/file-other.svg';
import StorageCategoryCard from './components/StorageCategoryCard';
import loader from '@/assets/assets/icons/loader.svg';

import { AppContext } from '@/context/AppContext';
import RecentlyUploaded from './components/RecentlyUploaded';


const Dashboard = () => {
  const {dashboardData,getDashboardData } = useContext(AppContext);
  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    getDashboardData();
    setloading(false)
  }, []);
  return loading || !dashboardData ?(
    <div className="flex justify-center items-center h-screen">
       <img src={loader} className='w-15 h-15' alt="" />
    </div>
  ): (
    <div className="px-5 py-3 w-full  flex-col lg:flex-row  justify-center items-start flex ">
      <div className="h-full lg:w-2/3 w-full flex flex-col justify-start items-center   ">
        <div className="w-full flex items-center p-5 justify-center">          
          <StorageStats
            used={dashboardData?.usedSpace || '1.00 MB'}
            total={dashboardData?.totalSpace || '1 GB'}
          />
        </div>

        <div className="flex justify-center items-start flex-wrap w-full  gap-10  ">
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
      <div className="mt-20 lg:mt-0 w-full lg:w-1/2 flex flex-col justify-start items-center ">
        <RecentlyUploaded recents={dashboardData?.recent10Uploads} />
      </div>
    </div>
  );
};

export default Dashboard;
