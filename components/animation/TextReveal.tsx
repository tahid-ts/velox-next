"use client";

import { useTextAnimation } from "@/hooks/useTextAnimation";
import { JSX, ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  animationProps?: {
    staggerAmount?: number;
    translateXValue?: number;
    delayValue?: number;
    once?: boolean;
  };
}

const TextReveal = ({
  children,
  className = "",
  animationProps,
}: AnimatedTextProps) => {
  const ref = useTextAnimation(animationProps);

  return (
    <div ref={ref} className={`gsap-title-anim ${className}`}>
      {children}
    </div>
  );
};
export default TextReveal;
