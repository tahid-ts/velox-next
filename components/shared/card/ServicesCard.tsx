/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import CornerBorder from "../ui/CornerBorder";
interface serviceCardProps {
  link: string;
  image: string;
  title: string;
  description: string;
}
const ServiceCard: React.FC<serviceCardProps> = ({
  link,
  image,
  title,
  description,
}) => {
  return (
    <div>
      <CornerBorder className="p-8 text-gray-700 group">
        <div className="p-8 group-hover:bg-teal rounded-xl">
          <div className="mb-4">
            <div className="w-18 h-18">
              <img src={image} alt="" />
            </div>
          </div>

          <Link href={`/${link}`} className="heading-sm group-hover:text-white">
            {title}
          </Link>

          <p
            className={`paragraph-md text-secondary group-hover:text-white mb-6 mt-2`}
          >
            {description}
          </p>

          <Link
            href={`/${link}`}
            className={`
          flex items-center gap-2 label-xs transition-all group-hover:text-white
          
        `}
          >
            VIEW DETAILS
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </CornerBorder>
    </div>
  );
};

export default ServiceCard;
