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
      <div className="grid gap-4">
        {recents.map((file, index) => (
          <div
            key={file._id || index}
            className="border p-3 rounded-lg shadow-sm bg-white flex flex-col gap-1"
          >
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            <p className="text-xs text-gray-400">
              Uploaded on {new Date(file.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyUploaded;
