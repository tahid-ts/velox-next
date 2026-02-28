"use client";

import React from "react";

interface DashboardCardSkeletonProps {
  className?: string;
}

const DashboardCardSkeleton: React.FC<DashboardCardSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-2xl p-5 w-full h-57.5 overflow-hidden
        bg-gray-200
        animate-pulse
        ${className}
      `}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        {/* Icon placeholder */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/60">
          <div className="h-5 w-5 rounded bg-gray-300" />
        </div>

        {/* View All button placeholder */}
        <div className="h-7 w-20 rounded-full bg-white/70" />
      </div>

      {/* Bottom Section */}
      <div>
        {/* Label */}
        <div className="h-4 w-24 rounded bg-white/70 mb-2" />

        {/* Value */}
        <div className="h-8 w-32 rounded bg-white/80" />
      </div>
    </div>
  );
};

export default DashboardCardSkeleton;
