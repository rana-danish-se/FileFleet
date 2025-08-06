import React from 'react';
import StorageStats from './components/StorageStats';
import filevdeo from "@/assets/assets/icons/file-video.svg";
import document from "@/assets/assets/icons/file-document.svg";
import images from "@/assets/assets/icons/file-image.svg"; 
import other from "@/assets/assets/icons/file-other.svg"; 
import StorageCategoryCard from './components/StorageCategoryCard';

const Dashboard = () => {
  return (
    <div className="px-5 py-3  h-full overflow-hidden">
      <div className='h-full flex flex-col justify-start items-center  xl:w-[50vw] border'>
        <div className='w-full flex items-center justify-center'>
          <StorageStats used={8} total={20} />
        </div>
        <div className='flex flex-wrap w-full justify-evenly overflow-y-scroll gap-10 mt-6 '>
          <StorageCategoryCard
            icon={document}
            storage="20 GB"
            category="Documents"
            lastUpdated="10:15am, 10 Oct"
          />
          <StorageCategoryCard
            icon={images}
            storage="20 GB"
            category="Images"
            lastUpdated="10:15am, 10 Oct"
          />
          <StorageCategoryCard
            icon={filevdeo}
            storage="20 GB"
            category="Video, Audio"
            lastUpdated="10:15am, 10 Oct"
          />
          <StorageCategoryCard
            icon={other}
            storage="20 GB"
            category="Others"
            lastUpdated="10:15am, 10 Oct"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
