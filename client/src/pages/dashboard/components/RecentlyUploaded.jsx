import { getFileIcon } from '@/utils/helpers';
import React, { useEffect } from 'react';

const formatFileSize = (bytes) => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${bytes} B`;
};

const RecentlyUploaded = ({ recents = [] }) => {
  useEffect(() => {
    console.log('Recent files:', recents);
  }, [recents]);

  if (recents.length === 0) {
    return <p className="text-sm text-gray-500">No recent uploads</p>;
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">Recent files uploaded</h3>
      <div className="grid gap-4 max-h-[100vh] overflow-y-scroll">
        {recents.map((file, index) => (
          <div
            key={file._id || index}
            className=" p-3 rounded-lg shadow-sm  bg-gray-600  flex  gap-1"
          >
            <div className='flex items-center justify-center bg-gray-800 w-14 h-14 rounded-full'>
              <img
                src={getFileIcon(file.type, file.category)}
                className="w-10 h-10 rounded-full "
                alt=""
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold">{file.name}</h4>
              <p className="text-xs text-gray-400">
                {new Date(file.createdAt).toLocaleDateString()} -{' '}
                {new Date(file.createdAt).toLocaleTimeString()}
              </p>
              <p className="text-xs text-gray-300">
                Size: {formatFileSize(file.size)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyUploaded;
