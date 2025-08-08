import dots from '@/assets/assets/icons/dots.svg';
import { convertFileSize, formatDateTime, getFileIcon } from '@/utils/helpers';
import { useEffect } from 'react';

const File = ({ name, createdAt, type, size, imageUrl, category }) => {
  useEffect(() => {
    console.log('extension', type);
    console.log('category', category);
    console.log(getFileIcon(type, category));
    // You can add more logic here if needed
  }, []);
  return (
    <div className=" flex flex-col p-6 bg-gray-700 shadow-2xl rounded-lg sm:w-[250px] w-full">
      <div className="flex justify-between items-center">
        {!imageUrl ? (
          <img src={getFileIcon(type, category)} alt="" className="w-14 h-14" />
        ) : (
          <img
            src={imageUrl}
            className="w-16 h-16 rounded-full object-cover"
            alt=""
          />
        )}
        <div className="flex flex-col items-end gap-2">
          <img className="w-8 h-8" src={dots} alt="" />
          <p className="text-xs">{convertFileSize(size, 1)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-5 items-start">
        <h4 className="text-sm font-semibold">{name}</h4>
        <h6 className="text-xs text-slate-400">{formatDateTime(createdAt)}</h6>
      </div>
    </div>
  );
};

export default File;
