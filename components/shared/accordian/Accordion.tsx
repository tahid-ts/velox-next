"use client";
import { useState, ReactNode } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
type AccordionItem = {
  id: string;
  title: string;
  description: ReactNode;
};

type AccordionProps = {
  data: AccordionItem[];
  className: string;
};

export default function Accordion({ data, className }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div className={"mx-auto w-full rounded-lg py-3 " + className}>
      {data.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);

        return (
          <div
            key={idx}
            className={`p-6 mb-6 rounded-xl ${isOpen ? "bg-green" : " bg-white"}`}
          >
            <button
              onClick={() => toggle(idx)}
              className="flex w-full xl:items-center justify-between  font-bold text-dark md:text-xl text-[16px] outline-none font-beVietnamPro cursor-pointer "
            >
              <div className="flex gap-4">
                <span className="bg-border text-green w-9 h-9 flex items-center justify-center rounded-full font-plus_jakarta">
                  {item.id}
                </span>
                <span
                  className={`text-start py-2  ${isOpen ? "text-white" : " text-green"}`}
                >
                  {" "}
                  {item.title}
                </span>
              </div>
              <span
                className={` transition-colors duration-200 w-8 h-8 rounded-full flex items-center justify-center ${
                  isOpen ? "text-green bg-white" : "text-black bg-border"
                }`}
              >
                {isOpen ? <AiOutlineMinus /> : <FiPlus />}
              </span>
            </button>

            <div
              className={`grid overflow-hidden text-black transition-all duration-300 ease-in-out  ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 pt-2.5"
                  : "grid-rows-[0fr] opacity-0 "
              }`}
            >
              <div className="overflow-hidden   lg:text-lg text-sm text-white/80 font-montserrat lg:ml-13.5 ml-6.8 lg:w-[90%] w-[95%]">
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
