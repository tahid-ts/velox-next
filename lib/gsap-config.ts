// // lib/gsap-config.ts
// "use client";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { CustomEase } from "gsap/CustomEase";
// import { useGSAP } from "@gsap/react";

// // Register plugins once — safely
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);
// }

// export { gsap, ScrollTrigger, ScrollSmoother, CustomEase, useGSAP };

// lib/gsap-config.ts
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);
}

export { gsap, ScrollTrigger, ScrollSmoother, CustomEase };
