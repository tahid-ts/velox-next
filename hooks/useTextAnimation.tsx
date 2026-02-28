// hooks/useTextAnimation.ts
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

interface UseTextAnimationProps {
  staggerAmount?: number;
  translateXValue?: number;
  delayValue?: number;
  easeType?: string;
  startTrigger?: string;
  once?: boolean;
}

export const useTextAnimation = (props?: UseTextAnimationProps) => {
  const {
    staggerAmount = 0.02,
    translateXValue = 20,
    delayValue = 0.15,
    easeType = "power2.out",
    startTrigger = "top 85%",
    once = false,
  } = props || {};

  const elementRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const element = elementRef.current;

    splitTextRef.current = new SplitText(element, {
      type: "chars, words",
      charsClass: "char",
      wordsClass: "word",
    });

    const animation = gsap.from(splitTextRef.current.chars, {
      duration: 0.12,
      delay: delayValue,
      x: translateXValue,
      autoAlpha: 0,
      stagger: staggerAmount,
      ease: easeType,
      scrollTrigger: {
        trigger: element,
        start: startTrigger,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      animation.kill();

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element || trigger.vars.trigger === element) {
          trigger.kill();
        }
      });

      if (splitTextRef.current) {
        splitTextRef.current.revert();
        splitTextRef.current = null;
      }
    };
  }, [
    staggerAmount,
    translateXValue,
    delayValue,
    easeType,
    startTrigger,
    once,
  ]);

  return elementRef;
};
