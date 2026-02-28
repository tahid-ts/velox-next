// "use client";

// import { useRef, ElementType, ReactNode } from "react";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "@/lib/gsap-config";

// type Direction = "top" | "bottom" | "left" | "right";

// interface FadeInProps {
//   children: ReactNode;
//   as?: ElementType;
//   className?: string;
//   direction?: Direction;
//   offset?: number;
//   duration?: number;
//   delay?: number;
//   ease?: string;
//   onScroll?: boolean;
// }

// export default function FadeIn({
//   children,
//   as: Tag = "div",
//   className = "",
//   direction = "bottom",
//   offset = 50,
//   duration = 1.15,
//   delay = 0.15,
//   ease = "power2.out",
//   onScroll = true,
// }: FadeInProps) {
//   const ref = useRef<HTMLElement>(null);

//   useGSAP(() => {
//     if (!ref.current) return;

//     const fromVars =
//       direction === "top"
//         ? { y: -offset }
//         : direction === "bottom"
//           ? { y: offset }
//           : direction === "left"
//             ? { x: -offset }
//             : { x: offset };

//     gsap.fromTo(
//       ref.current,
//       { opacity: 0, ...fromVars },
//       {
//         opacity: 1,
//         x: 0,
//         y: 0,
//         duration,
//         delay,
//         ease,
//         scrollTrigger: onScroll
//           ? {
//               trigger: ref.current,
//               start: "top 85%",
//               once: true,
//             }
//           : undefined,
//       },
//     );
//   });

//   return (
//     <Tag ref={ref} className={`fade-anim ${className}`}>
//       {children}
//     </Tag>
//   );
// }
"use client";

import { useRef, ElementType, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Direction = "top" | "bottom" | "left" | "right";

interface FadeInProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  direction?: Direction;
  offset?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  onScroll?: boolean;
}

export default function FadeIn({
  children,
  as: Tag = "div",
  className = "",
  direction = "bottom",
  offset = 50,
  duration = 1.15,
  delay = 0,
  ease = "power2.out",
  onScroll = true,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const from =
        direction === "top"
          ? { y: -offset }
          : direction === "bottom"
            ? { y: offset }
            : direction === "left"
              ? { x: -offset }
              : { x: offset };

      // hide before scroll
      gsap.set(el, { opacity: 0, ...from });

      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: onScroll
          ? {
              trigger: el,
              start: "top 85%",
              once: true,
            }
          : undefined,
      });

      // ✅ TS-safe refresh
      ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
