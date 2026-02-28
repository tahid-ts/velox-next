// const SparkLine = ({
//   data,
//   width = 100,
//   height = 40,
//   color = "#10b981",
// }: {
//   data: number[];
//   width?: number;
//   height?: number;
//   color?: string;
// }) => {
//   if (!data || data.length === 0) return null;

//   const min = Math.min(...data);
//   const max = Math.max(...data);
//   const range = max - min || 1;

//   // Generate SVG path
//   const points = data.map((value, index) => {
//     const x = (index / (data.length - 1)) * width;
//     const y = height - ((value - min) / range) * height;
//     return `${x},${y}`;
//   });

//   const pathData = `M ${points.join(" L ")}`;

//   return (
//     <svg width={width} height={height} className="inline-block">
//       {/* Area fill with gradient */}
//       <defs>
//         <linearGradient
//           id={`gradient-${color}`}
//           x1="0%"
//           y1="0%"
//           x2="0%"
//           y2="100%"
//         >
//           <stop offset="0%" stopColor={color} stopOpacity="0.3" />
//           <stop offset="100%" stopColor={color} stopOpacity="0.05" />
//         </linearGradient>
//       </defs>

//       {/* Line */}
//       <path
//         d={pathData}
//         fill="none"
//         stroke={color}
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />

//       {/* End point dot */}
//       <circle
//         cx={width}
//         cy={height - ((data[data.length - 1] - min) / range) * height}
//         r="2.5"
//         fill={color}
//       />
//     </svg>
//   );
// };

// export default SparkLine;

// shared/ui/Sparkline.tsx
import React from "react";
import { SparkPoint } from "@/types/currency";

interface SparklineProps {
  data: SparkPoint[];
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 90,
  height = 36,
  strokeColor = "rgba(255,255,255,0.85)",
  strokeWidth = 2,
}) => {
  if (data.length < 2) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const padding = strokeWidth;
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  const points = values.map((v, i) => {
    const x = padding + (i / (values.length - 1)) * usableW;
    const y = padding + usableH - ((v - min) / range) * usableH;
    return `${x},${y}`;
  });

  const polyline = points.join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
    >
      <polyline
        points={polyline}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default Sparkline;
