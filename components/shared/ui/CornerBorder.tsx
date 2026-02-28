/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { CSSProperties, ReactNode } from "react";

interface CornerBorderProps {
  children: ReactNode;
  className?: string;
  cornerLength?: number;
  borderWidthStart?: number;
  borderWidthEnd?: number;
  borderColor?: string;
}

const CornerBorder: React.FC<CornerBorderProps> = ({
  children,
  className = "",
  cornerLength = 60,
  borderWidthStart = 1,
  borderColor = "#0b6e6e",
}) => {
  const wrapperStyle: CSSProperties = {
    position: "relative",
  };

  const beforeAfterBase: CSSProperties = {
    content: '""',
    position: "absolute",
    width: `${cornerLength}px`,
    height: `${borderWidthStart}px`,
    background: `linear-gradient(to right, ${borderColor}, transparent)`,
  };

  return (
    <div className={`${className} relative`} style={wrapperStyle}>
      {/* Top Left Corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${cornerLength}px`,
          height: `${cornerLength}px`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${cornerLength}px`,
            height: `${borderWidthStart}px`,
            background: `linear-gradient(to right, ${borderColor}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${borderWidthStart}px`,
            height: `${cornerLength}px`,
            background: `linear-gradient(to bottom, ${borderColor}, transparent)`,
          }}
        />
      </div>

      {/* Top Right Corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: `${cornerLength}px`,
          height: `${cornerLength}px`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: `${cornerLength}px`,
            height: `${borderWidthStart}px`,
            background: `linear-gradient(to left, ${borderColor}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: `${borderWidthStart}px`,
            height: `${cornerLength}px`,
            background: `linear-gradient(to bottom, ${borderColor}, transparent)`,
          }}
        />
      </div>

      {/* Bottom Left Corner */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${cornerLength}px`,
          height: `${cornerLength}px`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: `${cornerLength}px`,
            height: `${borderWidthStart}px`,
            background: `linear-gradient(to right, ${borderColor}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: `${borderWidthStart}px`,
            height: `${cornerLength}px`,
            background: `linear-gradient(to top, ${borderColor}, transparent)`,
          }}
        />
      </div>

      {/* Bottom Right Corner */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: `${cornerLength}px`,
          height: `${cornerLength}px`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: `${cornerLength}px`,
            height: `${borderWidthStart}px`,
            background: `linear-gradient(to left, ${borderColor}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: `${borderWidthStart}px`,
            height: `${cornerLength}px`,
            background: `linear-gradient(to top, ${borderColor}, transparent)`,
          }}
        />
      </div>

      {children}
    </div>
  );
};

export default CornerBorder;
