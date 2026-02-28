// shared/card/WalletCard_Skeleton.tsx
import React from "react";

const WalletCard_Skeleton: React.FC = () => {
  return (
    <div
      className={`
        flex flex-col w-full h-full rounded-2xl overflow-hidden
        border border-gray-100 shadow-sm bg-[#F4F7F2]
      `}
    >
      {/* ── Header Skeleton ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="h-8 w-24 bg-gray-100 rounded-full animate-pulse" />
      </div>

      {/* ── Chart Panel Skeleton ── */}
      <div className="flex flex-col justify-between w-full bg-white mx-0 rounded-b-2xl px-6 pt-8 pb-6 h-full">
        <div className="flex items-center justify-center h-full">
          {/* Donut Chart Skeleton */}
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full bg-gray-100 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-gray-50 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="h-6 w-20 bg-gray-100 rounded animate-pulse mb-1 mx-auto" />
              <div className="h-4 w-16 bg-gray-100 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>

        <div>
          {/* Divider Skeleton */}
          <hr className="mt-6 mb-4 border-gray-100" />

          {/* Legend Skeleton */}
          <div className="flex items-center justify-center gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard_Skeleton;
