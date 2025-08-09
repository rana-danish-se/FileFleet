const StorageCategoryCard = ({ icon, storage, category, lastUpdated }) => {
  return (
    <div className="w-55 relative z-10 rounded-2xl mt-5 shadow-md bg-gray-900   text-white">
      <img
        src={icon}
        alt=""
        className="w-[67px] h-[72px] absolute -top-4 -left-2"
      />
      <div className="flex justify-end  px-2 py-2  z-10">
        <p className="text-slate-400 z-10 text-right">{storage}</p>
      </div>
      <div className="flex flex-1 mt-2 w-full gap-5 flex-col justify-center text-white items-center text-center px-2 py-2 z-10">
        <p className="z-10 text-xl">{category}</p>
        <hr className="w-full h-px bg-gray-400 z-10 rounded-full border-none " />

        <p className="text-gray-500 flex flex-col  text-xs z-10">
          <span className="text-sm font-semibold text-white">Last Updated</span>
          {lastUpdated !== 'N/A' ? lastUpdated : 'No date available'}
        </p>
      </div>
    </div>
  );
};

export default StorageCategoryCard;
