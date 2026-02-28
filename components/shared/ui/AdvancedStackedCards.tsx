/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color?: string;
}

interface Props {
  cards: Card[];
}

const AdvancedStackedCards = ({ cards }: Props) => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".stack-card");

      gsap.set(panels, {
        yPercent: (i) => (i === 0 ? 0 : 250),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${(panels.length - 1) * window.innerHeight}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;

        tl.to(panel, {
          yPercent: 0,
          duration: 1,
          ease: "none",
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className=" w-full overflow-hidden h-screen sticky top-40 "
    >
      <div className="relative flex items-start justify-center h-full">
        {cards.map((card, i) => (
          <div
            key={i}
            className="stack-card absolute"
            style={{ zIndex: i + 1 }}
          >
            <div className="relative">
              <svg
                width="873"
                height="380"
                viewBox="0 0 873 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M861 0C867.627 9.76049e-06 873 5.37259 873 12V269.4C873 272.775 871.579 275.995 869.085 278.269L760.933 376.868C758.722 378.883 755.839 380 752.849 380H12C5.37259 380 5.38573e-06 374.627 0 368V112C0 105.373 5.37258 100 12 100H44C74.9279 99.9999 100 74.9279 100 44V12C100 5.37258 105.373 0 112 0H861Z"
                  fill={card.color}
                />
              </svg>
              <div className="absolute inset-0">
                <div className="flex">
                  <div>
                    <span className="bg-white p-10 rounded-full flex items-center justify-center text-[32px] w-10 h-10">
                      {card.id}
                    </span>
                  </div>
                  <div className="flex w-[95%] items-center px-11 pt-11 pb-2.5">
                    <h1 className="w-1/6 label-xs text-white">
                      {card.serviceId}
                    </h1>
                    <div className="border-b border-green-500 w-4/6"></div>
                    <div className="w-1/6">
                      <img src={card.icon} alt="" />
                    </div>
                  </div>
                </div>
                <div className="px-11 flex flex-col gap-2.75">
                  <h1 className="text-white heading-md">{card.title}</h1>
                  <p className="text-primary paragraph-md ">
                    {card.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 px-11 pt-8 gap-4">
                  {card.features.map((feature, index) => (
                    <div
                      key={index}
                      className="paragraph-md text-white flex gap-2 items-center"
                    >
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.6804 1.34387C21.6614 1.28433 21.3117 1.38716 21.2522 1.39813C20.6289 1.53896 20.0272 1.76392 19.4527 2.0458C18.2927 2.61215 17.2521 3.39535 16.2657 4.21917C14.0976 6.03226 12.1193 8.07026 10.3253 10.252C10.282 10.0514 9.57452 6.89127 8.22213 6.18122C7.77221 5.94551 7.35215 5.9644 7.35215 5.9644C6.77218 5.98877 6.26821 6.34646 6.02963 6.71509C5.50393 7.53342 5.80732 8.34122 6.10279 9.0972C6.68543 10.593 7.27089 12.0865 7.8535 13.5823C8.04857 14.081 8.26807 14.6122 8.71267 14.9103C9.30078 15.306 10.1246 15.1597 10.7046 14.7533C11.2872 14.3494 11.6829 13.737 12.0732 13.1434C12.3008 12.7965 12.5339 12.4522 12.767 12.1081C13.5475 10.9645 14.3606 9.84254 15.206 8.7423C16.0487 7.64474 16.9241 6.56894 17.8266 5.51726C18.729 4.4658 19.6612 3.44143 20.6234 2.44407C20.8646 2.19474 21.1058 1.94534 21.3497 1.6989C21.3985 1.65012 21.6992 1.40343 21.6804 1.34387Z"
                          fill="#E8EBE4"
                        />
                        <path
                          d="M9.99998 0C8.65043 0 7.34131 0.265608 6.10841 0.78582C4.91861 1.28982 3.84827 2.01075 2.92954 2.92954C2.01075 3.84828 1.28998 4.91595 0.785818 6.10843C0.26558 7.34119 0 8.65023 0 9.9998C0 11.3494 0.265607 12.6585 0.785818 13.8914C1.28998 15.0839 2.01075 16.1517 2.92954 17.0704C3.84824 17.9892 4.91583 18.71 6.1083 19.2142C7.3414 19.7346 8.65029 20 9.99987 20C11.3494 20 12.6585 19.7344 13.8914 19.2142C15.0812 18.7102 16.1516 17.9892 17.0703 17.0705C17.9891 16.1517 18.7099 15.084 19.214 13.8915C19.7345 12.6585 19.9998 11.3495 19.9998 10C19.9998 8.65042 19.7342 7.3413 19.214 6.10843C19.149 5.95398 19.0813 5.8022 19.008 5.65321C18.8616 5.82128 18.7153 5.98933 18.569 6.15718C18.2411 6.53924 17.9132 6.9296 17.5907 7.31977C17.8889 8.15985 18.0488 9.06235 18.0488 10C18.0488 14.4364 14.4389 18.0489 9.99989 18.0489C5.56352 18.0489 1.95102 14.439 1.95102 10C1.95102 5.56362 5.5609 1.95108 9.99989 1.95108C11.9755 1.95108 13.7886 2.66658 15.1897 3.85354C15.3386 3.72615 15.4878 3.59872 15.6396 3.47151C15.9621 3.20042 16.3279 2.90514 16.729 2.60418C15.8916 1.83989 14.9377 1.23023 13.8915 0.785819C12.6584 0.265385 11.3495 0 9.99998 0Z"
                          fill="#E8EBE4"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvancedStackedCards;
