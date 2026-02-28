/* eslint-disable @next/next/no-img-element */
import React from "react";

type PageHeaderProps = {
  title: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div>
      <div className={`relative w-full bg-artboard`}>
        <div className="relative desktop-lg:p-5 m-0">
          <div>
            <img
              src="/image/header/page_header_image.png"
              className="w-full hidden lg:block"
              alt=""
            />
            <div className="bg-[#033428] block lg:hidden w-full h-50"></div>
          </div>
          <div
            className={`absolute inset-0  flex items-center justify-center font-bold text-[32px] leading-10 lg:text-[40px] lg:leading-12  whitespace-pre-line  text-white  font-plus_jakarta z-10`}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
