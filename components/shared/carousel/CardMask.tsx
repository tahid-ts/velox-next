/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";

interface CardMaskProps {
  width?: number | string;
  height?: number | string;
  notchWidth?: number;
  notchHeight?: number;
  notchRadius?: number;
  borderRadius?: number;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  effect?: "hover" | "active" | "always" | boolean;
  animationDuration?: number;
  cornerContent?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  borderColor?: string;
  borderWidth?: number;

  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundOverlay?: string;

  isActive?: boolean;
  isHovered?: boolean;
  growOnHover?: boolean;
}

const CardMask: React.FC<CardMaskProps> = ({
  width = "100%",
  height = 400,
  notchWidth = 64,
  notchHeight = 40,
  notchRadius = 12,
  borderRadius = 12,
  position = "bottomRight",
  effect = "hover",
  animationDuration = 120,
  cornerContent,
  className = "",
  children,
  borderColor = "",
  borderWidth = 1.5,

  background = "",
  backgroundColor = "",
  backgroundImage = "",
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundOverlay = "",

  isHovered = false,
  growOnHover = false,
  isActive: externalIsActive = false,
}) => {
  const [internalIsActive, setInternalIsActive] = useState(
    effect === "always" || effect === true,
  );
  const [hoverState, setHoverState] = useState(false);

  const isActive =
    effect === "always" ||
    effect === true ||
    externalIsActive ||
    hoverState ||
    isHovered ||
    internalIsActive;

  const [animatedProgress, setAnimatedProgress] = useState(isActive ? 1 : 0);

  const [clipId] = useState(
    () => `clip-${Math.random().toString(36).slice(2, 9)}`,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Get actual pixel dimensions from container
  const [containerDimensions, setContainerDimensions] = useState({
    width: 400,
    height: 400,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setContainerDimensions({
          width: clientWidth || 400,
          height: clientHeight || 400,
        });
      }
    };

    updateDimensions();

    // Optional: Add resize observer for responsive updates
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const resolvedWidth = containerDimensions.width;
  const resolvedHeight = containerDimensions.height;

  useEffect(() => {
    if (animationRef.current !== null)
      cancelAnimationFrame(animationRef.current);

    const target = isActive ? 1 : 0;
    const start = animatedProgress;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = start + (target - start) * ease;

      setAnimatedProgress(current);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isActive, animationDuration]);

  const handleEnter = () => {
    if (effect === "hover") setHoverState(true);
  };
  const handleLeave = () => {
    if (effect === "hover") setHoverState(false);
  };
  const handleClick = () => {
    if (effect === true) setInternalIsActive((v) => !v);
  };

  //   const scale = useMemo(() => {
  //     if (growOnHover && (isHovered || hoverState)) {
  //       return 1.05;
  //     }
  //     return 1;
  //   }, [growOnHover, isHovered, hoverState]);

  const paths = useMemo(() => {
    const r = Math.max(0, borderRadius);
    const nr = Math.max(0, notchRadius);
    const w = Math.max(1, resolvedWidth);
    const h = Math.max(1, resolvedHeight);
    const notchW = Math.min(notchWidth, w - 2 * r);
    const notchH = Math.min(notchHeight, h - 2 * r);

    const nw = notchW * animatedProgress;
    const nh = notchH * animatedProgress;
    const nR = nr * animatedProgress;

    const makeNotchedPath = () => {
      switch (position) {
        case "bottomRight": {
          const nx = w - nw;
          const ny = h - nh;

          // Start at top-left
          return [
            `M ${r} 0`,
            // Top edge to top-right
            `H ${w - r}`,
            // Top-right corner
            `Q ${w} 0 ${w} ${r}`,
            // Right edge down to notch start
            `V ${ny - r}`,
            // Outer corner before notch (border radius)
            `Q ${w} ${ny} ${w - r} ${ny}`,
            // Horizontal line to notch inner corner
            `H ${nx + nR}`,
            // Notch inner top-right corner (notch radius)
            `Q ${nx} ${ny} ${nx} ${ny + nR}`,
            // Vertical line down to bottom
            `V ${h - r}`,
            // Bottom-right corner (border radius)
            `Q ${nx} ${h} ${nx - r} ${h}`,
            // Bottom edge to left
            `H ${r}`,
            // Bottom-left corner
            `Q 0 ${h} 0 ${h - r}`,
            // Left edge up
            `V ${r}`,
            // Top-left corner
            `Q 0 0 ${r} 0`,
            "Z",
          ].join(" ");
        }
        case "topRight": {
          const nx = w - nw;
          const ny = nh;

          // Start at top-left
          return [
            `M ${r} 0`,
            // Top edge to notch start
            `H ${nx - nR}`,
            // Notch inner top-left corner (notch radius)
            `Q ${nx} 0 ${nx} ${nR}`,
            // Vertical line down notch side
            `V ${ny - nR}`,
            // Notch inner bottom-left corner (notch radius)
            `Q ${nx} ${ny} ${nx + nR} ${ny}`,
            // Horizontal line to top-right corner start
            `H ${w - r}`,
            // Top-right corner (border radius)
            `Q ${w} ${ny} ${w} ${ny + r}`,
            // Right edge down
            `V ${h - r}`,
            // Bottom-right corner
            `Q ${w} ${h} ${w - r} ${h}`,
            // Bottom edge left
            `H ${r}`,
            // Bottom-left corner
            `Q 0 ${h} 0 ${h - r}`,
            // Left edge up
            `V ${r}`,
            // Top-left corner
            `Q 0 0 ${r} 0`,
            "Z",
          ].join(" ");
        }
        case "bottomLeft": {
          const nx = nw;
          const ny = h - nh;

          // Start at top-left
          return [
            `M ${r} 0`,
            // Top edge right
            `H ${w - r}`,
            // Top-right corner
            `Q ${w} 0 ${w} ${r}`,
            // Right edge down
            `V ${h - r}`,
            // Bottom-right corner
            `Q ${w} ${h} ${w - r} ${h}`,
            // Bottom edge to notch start
            `H ${nx + r}`,
            // Outer corner before notch (border radius)
            `Q ${nx} ${h} ${nx} ${h - r}`,
            // Vertical line up to notch inner corner
            `V ${ny + nR}`,
            // Notch inner bottom-left corner (notch radius)
            `Q ${nx} ${ny} ${nx - nR} ${ny}`,
            // Horizontal line to left edge
            `H ${r}`,
            // Bottom-left corner (border radius) - but we're at the left edge
            `Q 0 ${ny} 0 ${ny - r}`,
            // Left edge up
            `V ${r}`,
            // Top-left corner
            `Q 0 0 ${r} 0`,
            "Z",
          ].join(" ");
        }
        case "topLeft": {
          const nx = nw;
          const ny = nh;

          // Start at the point after notch on top edge
          return [
            `M ${nx + nR} 0`,
            // Top edge to top-right
            `H ${w - r}`,
            // Top-right corner
            `Q ${w} 0 ${w} ${r}`,
            // Right edge down
            `V ${h - r}`,
            // Bottom-right corner
            `Q ${w} ${h} ${w - r} ${h}`,
            // Bottom edge left
            `H ${r}`,
            // Bottom-left corner
            `Q 0 ${h} 0 ${h - r}`,
            // Left edge up to notch start
            `V ${ny + r}`,
            // Outer corner before notch (border radius)
            `Q 0 ${ny} ${r} ${ny}`,
            // Horizontal line to notch inner corner
            `H ${nx - nR}`,
            // Notch inner top-right corner (notch radius)
            `Q ${nx} ${ny} ${nx} ${ny - nR}`,
            // Vertical line up
            `V ${r}`,
            // Top-left corner (border radius)
            `Q ${nx} 0 ${nx + r} 0`,
            "Z",
          ].join(" ");
        }
        default:
          // Full rounded rectangle without notch
          return [
            `M ${r} 0`,
            `H ${w - r}`,
            `Q ${w} 0 ${w} ${r}`,
            `V ${h - r}`,
            `Q ${w} ${h} ${w - r} ${h}`,
            `H ${r}`,
            `Q 0 ${h} 0 ${h - r}`,
            `V ${r}`,
            `Q 0 0 ${r} 0`,
            "Z",
          ].join(" ");
      }
    };

    return { basePath: makeNotchedPath(), animatedPath: makeNotchedPath() };
  }, [
    resolvedWidth,
    resolvedHeight,
    notchWidth,
    notchHeight,
    notchRadius,
    borderRadius,
    position,
    animatedProgress,
  ]);

  const cornerStyle = useMemo(() => {
    const offset = 0;
    switch (position) {
      case "topLeft":
        return { top: offset, left: offset };
      case "topRight":
        return { top: offset, right: offset };
      case "bottomLeft":
        return { bottom: offset, left: offset };
      default:
        return { bottom: offset, right: offset };
    }
  }, [position]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none transition-all duration-300 overflow-visible ${
        growOnHover ? "origin-center" : ""
      } ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        // transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-xl"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          background: background || backgroundColor || "transparent",
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize,
          backgroundPosition,
          backgroundRepeat: "no-repeat",
        }}
      >
        {backgroundOverlay && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: backgroundOverlay }}
          />
        )}

        {resolvedWidth > 0 && resolvedHeight > 0 && (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${resolvedWidth} ${resolvedHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id={clipId}>
                <path d={paths.animatedPath} />
              </clipPath>
            </defs>
          </svg>
        )}

        <div className="w-full h-full relative overflow-hidden z-10">
          {children}
        </div>
      </div>

      {borderWidth > 0 && resolvedWidth > 0 && resolvedHeight > 0 && (
        <svg
          viewBox={`0 0 ${resolvedWidth} ${resolvedHeight}`}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d={paths.animatedPath}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderWidth}
          />
        </svg>
      )}

      {cornerContent && (
        <div
          className="absolute z-20 transition-all duration-300 ease-out overflow-visible"
          style={{
            ...cornerStyle,
            opacity: animatedProgress,
          }}
        >
          {cornerContent}
        </div>
      )}
    </div>
  );
};

export default CardMask;
