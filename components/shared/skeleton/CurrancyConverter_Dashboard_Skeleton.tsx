import React from "react";

const CurrancyConverter_Dashboard_Skeleton = () => {
  return (
    <div>
      <div className="w-full lg:max-w-5xl h-full z-50 bg-white">
        <div className="bg-gray-300 rounded-t-2xl h-15 px-6 py-10 flex items-center animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="lg:px-8 px-5 py-6 bg-white rounded-b-2xl">
          <div className="pb-6">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8.25 mb-6">
            {/* FROM */}
            <div className="bg-gray-300 p-5 rounded-sm w-full flex flex-col justify-between h-24 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex justify-between items-center gap-3">
                <div className="h-8 bg-gray-200 rounded flex-1 min-w-0"></div>
                <div className="flex items-center gap-2 shrink-0 bg-white p-1.5 rounded-md">
                  <div className="w-8 h-6 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>

            {/* TO */}
            <div className="bg-gray-300 p-5 rounded-sm flex flex-col justify-between h-24 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex justify-between items-center gap-3">
                <div className="h-8 bg-gray-200 rounded flex-1 min-w-0"></div>
                <div className="flex items-center gap-2 shrink-0 bg-white p-1.5 rounded-md">
                  <div className="w-8 h-6 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>

            {/* RATE */}
            <div className="bg-gray-300 p-5 rounded-sm flex flex-col items-start justify-center h-24 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <button className="w-full h-10 bg-gray-300 rounded animate-pulse"></button>
        </div>
      </div>
    </div>
  );
};

export default CurrancyConverter_Dashboard_Skeleton;
