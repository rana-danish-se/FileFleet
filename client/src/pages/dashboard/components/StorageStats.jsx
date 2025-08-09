import React, { useEffect } from "react";

const StorageStats = ({ used, total }) => {
  // Convert formatted string (e.g., "1.08 MB") to bytes
  const parseSizeToBytes = (sizeStr) => {
    if (!sizeStr) return 0;
    const [value, unit] = sizeStr.split(" ");
    const num = parseFloat(value);

    switch (unit) {
      case "GB":
        return num * 1024 * 1024 * 1024;
      case "MB":
        return num * 1024 * 1024;
      case "KB":
        return num * 1024;
      default:
        return num;
    }
  };

  // Convert bytes back into human-readable string
  const formatBytes = (bytes) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    } else if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return bytes + " B";
    }
  };

  const usedBytes = parseSizeToBytes(used);
  const totalBytes = parseSizeToBytes(total);

  const percentageUsed = totalBytes
    ? Math.round((usedBytes / totalBytes) * 100)
    : 0;

  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentageUsed / 100) * circumference;

  return (
    <div className="flex items-center justify-between w-full max-w-xl bg-red-400 text-white p-4 rounded-3xl shadow-2xl">
      {/* Circle Progress */}
      <div className="relative w-36 h-36">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#FECACA"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#fff"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold">{percentageUsed}%</p>
          <p className="text-sm">Space used</p>
        </div>
      </div>

      {/* Text Info */}
      <div className="ml-6">
        <p className="text-lg font-semibold">Available Storage</p>
        <p className="text-md">
          {formatBytes(usedBytes)} / {formatBytes(totalBytes)}
        </p>
      </div>
    </div>
  );
};

export default StorageStats;
