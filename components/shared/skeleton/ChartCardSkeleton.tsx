"use client";

import React from "react";

const ChartCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col rounded-2xl bg-white border border-gray-100 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-border rounded-t-2xl px-6 py-4 mb-6">
        {/* Title placeholder */}
        <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>

        {/* Dropdowns placeholder */}
        <div className="flex items-center gap-2">
          {[1, 2].map((_, idx) => (
            <button
              key={idx}
              type="button"
              className="flex items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 animate-pulse"
              aria-label={`Dropdown loading ${idx + 1}`}
            >
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Chart area placeholder */}
      <div className="flex-1 px-6 pb-6">
        <div className="h-64 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default ChartCardSkeleton;
