/* eslint-disable @next/next/no-img-element */
import React from "react";

import Link from "next/link";
import Inner_pageLayout from "@/components/layout/Inner_pageLayout";

const Notfound = () => {
  return (
    <Inner_pageLayout title="404 error">
      <div className="h-screen bg-artboard  flex flex-col justify-center items-center ">
        <div>
          <div className="relative ">
            <img src="/image/404/image.png" alt="" />
            <div className="absolute inset-0 mx-auto mt-80  flex flex-col items-center justify-center gap-2">
              <h1 className="text-4xl text-white">Page Not Found !</h1>

              <Link
                href={"/"}
                className={`
        group relative flex items-center gap-4
        rounded-full p-1.5
        transition-all duration-200
        hover:shadow-lg cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed bg-white
      `}
              >
                <div
                  className={`
          flex-1 rounded-full px-5 py-2.5 transition-colors bg-light-green
        `}
                >
                  <span className="text-[16px] font-bold tracking-wide uppercase">
                    Back to Home
                  </span>
                </div>

                <div
                  className={`
            rounded-full w-11 h-11 flex items-center justify-center
            transition-all group-hover:translate-x-1 bg-light-green
            
          `}
                >
                  <img src="/image/button/arrow.png" alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Inner_pageLayout>
  );
};

export default Notfound;
