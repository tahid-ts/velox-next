"use client";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "primary"
    | "full";
  className?: string;
  mainClassName?: string;
  controlPy?: boolean;
  mxpxNone?: boolean;
}

const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  primary:
    "desktop-lg:max-w-[1520px]  desktop:min-w-[1320px]  laptop-xl:max-w-[1140px] laptop-lg:max-w-[960px] laptop:max-w-[720px] tab:max-w-[540px]  max-w-full ",
  full: "max-w-full",
};

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = "primary",
  className = "",
  mainClassName = "",
  controlPy = true,
  mxpxNone = false,
}) => {
  const resolvedMaxWidth = maxWidthMap[maxWidth];

  const pyClasses = controlPy ? "py-15 laptop-lg:py-30" : "";
  const mxpxClasses = !mxpxNone ? "px-3 " : "";

  return (
    <div className={`w-full h-auto ${mainClassName}`}>
      <div
        className={`
          mx-auto w-full h-full
          ${mxpxClasses}
          ${pyClasses}
          ${resolvedMaxWidth}
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;

// "use client";
// import React, { ReactNode } from "react";

// interface ContainerProps {
//   children: ReactNode;
//   maxWidth?:
//     | "sm"
//     | "md"
//     | "lg"
//     | "xl"
//     | "2xl"
//     | "3xl"
//     | "4xl"
//     | "5xl"
//     | "6xl"
//     | "7xl"
//     | "primary"
//     | "full";
//   className?: string;
//   mainClassName?: string;
//   controlPy?: boolean;
//   mxpxNone?: boolean;
//   bgImage?: string;
//   overlay?: boolean;
//   overlayColor?: string;
//   overlayOpacity?: number;
// }

// const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
//   sm: "max-w-sm",
//   md: "max-w-md",
//   lg: "max-w-lg",
//   xl: "max-w-xl",
//   "2xl": "max-w-2xl",
//   "3xl": "max-w-3xl",
//   "4xl": "max-w-4xl",
//   "5xl": "max-w-5xl",
//   "6xl": "max-w-6xl",
//   "7xl": "max-w-7xl",
//   primary:
//     "desktop-lg:max-w-[1520px] desktop:min-w-[1320px] laptop-xl:max-w-[1140px] laptop-lg:max-w-[960px] laptop:max-w-[720px] tab:max-w-[540px] max-w-full",
//   full: "max-w-full",
// };

// const Container: React.FC<ContainerProps> = ({
//   children,
//   maxWidth = "primary",
//   className = "",
//   mainClassName = "",
//   controlPy = true,
//   mxpxNone = false,
//   bgImage,
//   overlay = false,
//   overlayColor = "",
//   overlayOpacity = 1,
// }) => {
//   const resolvedMaxWidth = maxWidthMap[maxWidth];

//   const pyClasses = controlPy ? "py-15 laptop-lg:py-30" : "";
//   const mxpxClasses = !mxpxNone ? "px-3" : "";

//   const hasOverlay = overlay || !!overlayColor;

//   const backgroundStyle = bgImage
//     ? {
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }
//     : {};

//   return (
//     <div
//       className={`w-full h-auto relative ${mainClassName}`}
//       style={backgroundStyle}
//     >
//       {hasOverlay && (
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundColor: overlayColor,
//             opacity: overlayOpacity,
//             zIndex: 1,
//           }}
//           aria-hidden="true"
//         />
//       )}

//       <div
//         className={`
//           mx-auto w-full
//           relative
//           ${mxpxClasses}
//           ${pyClasses}
//           ${resolvedMaxWidth}
//           ${className}
//         `}
//         style={{ zIndex: 2 }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Container;
