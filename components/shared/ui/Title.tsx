import TextReveal from "@/components/animation/TextReveal";
import React from "react";

type TitlePosition = "left" | "center" | "right";
type TitleProps = {
  title: string;
  className?: string;
  position?: TitlePosition;
  white?: boolean;
};

const positionClasses: Record<TitlePosition, string> = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
};

const Title: React.FC<TitleProps> = ({
  title,
  className,
  position = "left",
  white = false,
}) => {
  return (
    <div>
      <TextReveal>
        <div className={`flex items-center mb-8 ${positionClasses[position]}`}>
          <div
            className={`  font-bold text-[32px] leading-10 lg:text-[40px] lg:leading-12  whitespace-pre-line  ${white ? "text-white" : "text-[#071e1a]"}  font-plus_jakarta z-10 ${className}`}
          >
            {title}
          </div>
        </div>
      </TextReveal>
    </div>
  );
};

export default Title;
