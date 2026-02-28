"use client";

import { marqueeData } from "@/data/data";
import React from "react";
import Marquee from "react-fast-marquee";

export interface MarqueeSection_twoProps {
  items?: MarqueeItem[];
  speed?: number;
  gradient?: boolean;
}

export interface MarqueeItem {
  id: number;
  type?: string;
  content?: string;
  svg?: string;
}

export interface MarqueeItem {
  id: number;
  type?: string;
  content?: string;
  svg?: string;
}

const MarqueeSection_two: React.FC<MarqueeSection_twoProps> = ({
  items = marqueeData,
  speed = 50,
  gradient = false,
}) => {
  return (
    <div className="relative  z-9 bg-green2 overflow-x-hidden h-20 flex items-center">
      {/* Removed -rotate-1 */}
      <div className="bg-(--primary-color-two) flex items-center justify-center max-md:h-20">
        <Marquee
          speed={speed}
          gradient={gradient}
          className="flex items-center"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center w-auto shrink-0 whitespace-nowrap"
            >
              {item.type && (
                <span className="font-bold uppercase text-white text-[35px] md:text-[56px] leading-[1.1] overflow-hidden">
                  {item.type}
                </span>
              )}

              {item.svg && (
                <span
                  className="flex items-center justify-center mx-8 shrink-0 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
              )}

              {item.content && (
                <span className="font-bold uppercase text-[35px] md:text-[56px] leading-[1.1] mx-4 text-transparent [-webkit-text-stroke:1px_white] overflow-hidden">
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeSection_two;
