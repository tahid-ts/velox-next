import FadeIn from "@/components/animation/FadeIn";
import React from "react";

type SectionHeaderPosition = "left" | "center" | "right";
type Direction = "top" | "bottom" | "left" | "right";
type SectionHeaderProps = {
  title: string;
  position?: SectionHeaderPosition;
  white?: boolean;
  direction?: Direction;
};

const positionClasses: Record<SectionHeaderPosition, string> = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  position = "left",
  white = false,
  direction = "bottom",
}) => {
  return (
    <div>
      <FadeIn direction={direction}>
        <div className={` flex items-center mb-2 ${positionClasses[position]}`}>
          <div className="relative flex items-center">
            <div className={`absolute`}>
              <svg
                width="27"
                height="33"
                viewBox="0 0 27 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7084 0.545698C20.5527 0.761128 23.2857 1.73282 25.6257 3.35764C25.7618 3.45215 25.7919 3.63994 25.6948 3.77424V3.77424C25.5978 3.90854 25.4104 3.93848 25.2742 3.84408C23.0241 2.28405 20.3969 1.35107 17.6631 1.144C14.8295 0.929377 11.9917 1.50299 9.4639 2.80136C6.9361 4.09972 4.81685 6.07221 3.3407 8.50048C1.86455 10.9288 1.08909 13.7181 1.10013 16.5599C1.11118 19.4016 1.9083 22.1848 3.40328 24.6016C4.89826 27.0183 7.03278 28.9742 9.5706 30.2529C12.1084 31.5316 14.9505 32.0831 17.7824 31.8465C20.5146 31.6182 23.1344 30.6648 25.3723 29.0873C25.5078 28.9919 25.6954 29.0204 25.7935 29.1539V29.1539C25.8915 29.2874 25.8629 29.4755 25.7276 29.571C23.4003 31.214 20.6749 32.2069 17.8324 32.4444C14.8902 32.6903 11.9373 32.1173 9.30061 30.7888C6.66392 29.4603 4.44623 27.4281 2.893 24.9172C1.33978 22.4063 0.511596 19.5146 0.500121 16.5622C0.488646 13.6097 1.29433 10.7117 2.82798 8.1888C4.36164 5.66592 6.56347 3.61658 9.18976 2.26763C11.8161 0.918675 14.7644 0.322711 17.7084 0.545698Z"
                  stroke={`${white ? "#ffffff" : "#0B6E6E"}`}
                />
              </svg>
            </div>

            <div
              className={`ml-3 ${white ? "text-white" : "text-[#0b6e6e]"}  font-plus_jakarta z-10`}
            >
              {title}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default SectionHeader;
