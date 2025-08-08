import React from 'react';
import sekeleton from '@/assets/Union.svg';

const StorageCategoryCard = ({ icon, storage, category, lastUpdated }) => {
  return (
    <div className="w-45 relative z-10 rounded-2xl mt-5 shadow-md   text-black">
      <img src={sekeleton} alt="" className="absolute top-0 w-full right-0 " />
      <img src={icon} alt="" className="w-[67px] h-[72px] absolute -top-4 -left-2" />
      <div className="flex justify-end  px-2 py-2  z-10">
        <p className="text-black z-10 text-right">{storage}</p>
      </div>
      <div className="flex flex-1 mt-2 w-full gap-5 flex-col justify-center text-black items-center text-center px-2 py-2 z-10">
        <p className="z-10 text-xl">{category}</p>
        <hr className="w-full h-px bg-black z-10 rounded-full border-none " />

        <p className="text-gray-500 flex flex-col  text-xs z-10">
          <span className="text-sm font-semibold">Last Updated</span>
          {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default StorageCategoryCard;
