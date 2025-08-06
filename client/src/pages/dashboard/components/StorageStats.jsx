import React from "react";

const StorageStats = ({ used, total }) => {
  const percentageUsed = Math.round((used / total) * 100);
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
            strokeDasharray={circumference + " " + circumference}
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
        <p className="text-md">{`${used}GB / ${total}GB`}</p>
      </div>
    </div>
  );
};

export default StorageStats;
