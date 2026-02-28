"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OdometerProps {
  startValue: number;
  endValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  animateOnce?: boolean;
  start?: string;
}

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

const Odometer: React.FC<OdometerProps> = ({
  startValue,
  endValue,
  duration = 2,
  prefix = "",
  suffix = "",
  animateOnce = true,
  start = "top 80%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const startStr = String(startValue);
  const endStr = String(endValue).padStart(startStr.length, "0");

  useEffect(() => {
    if (!containerRef.current) return;

    const digits = containerRef.current.querySelectorAll("[data-digit]");

    const animate = () => {
      if (animateOnce && animatedRef.current) return;

      digits.forEach((digitEl, i) => {
        const from = Number(startStr[i] ?? 0);
        const to = Number(endStr[i]);
        const height = (digitEl as HTMLElement).clientHeight;

        const strip = digitEl.querySelector("[data-strip]");

        if (!strip) return;

        gsap.set(strip, { y: -from * height });

        const distance = to >= from ? to - from : 10 - from + to;

        gsap.to(strip, {
          y: `-=${distance * height}`,
          duration,
          ease: "power3.out",
        });
      });

      animatedRef.current = true;
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start,
      onEnter: animate,
      onEnterBack: () => !animateOnce && animate(),
    });

    return () => {
      trigger.kill();
    };
  }, [startStr, endStr, duration, animateOnce, start]);

  return (
    <div className="flex items-center gap-1 font-bold text-4xl">
      {prefix && <span>{prefix}</span>}

      <div ref={containerRef} className="flex overflow-hidden">
        {endStr.split("").map((_, i) => (
          <div
            key={i}
            data-digit
            className="relative h-[1em] w-[0.75em] overflow-hidden"
          >
            <div
              data-strip
              className="absolute top-0 left-0 flex flex-col heading-2x"
            >
              {DIGITS.map((d) => (
                <span
                  key={d}
                  className="h-[1em] leading-[1em] text-center heading-2x font-plus_jakarta"
                >
                  {d}
                </span>
              ))}
              {DIGITS.map((d) => (
                <span
                  key={`repeat-${d}`}
                  className="h-[1em] leading-[1em] text-center heading-2x font-plus_jakarta"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {suffix && <span>{suffix}</span>}
    </div>
  );
};

export default Odometer;
