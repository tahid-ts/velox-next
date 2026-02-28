/* eslint-disable @next/next/no-img-element */
import React from "react";

type ButtonVariant = "white" | "teal" | "dark";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  showArrow?: boolean;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  text = "SWAP CURRENCY",
  onClick,
  disabled = false,
  className = "",
  showArrow = true,
  variant = "white",
  type = "button",
}) => {
  // Define variant-specific classes
  const variantStyles = {
    white: {
      outer: "bg-white",
      inner: "bg-light-green group-hover:bg-light-green text-gray-900",
      arrow: "bg-light-green group-hover:bg-light-green",
    },
    teal: {
      outer: "bg-[rgba(11,110,110,1)]",
      inner: "bg-light-green group-hover:bg-white text-black",
      arrow: "bg-light-green group-hover:bg-white",
    },
    dark: {
      outer: "bg-green",
      inner: "bg-light-green group-hover:bg-white text-black",
      arrow: "bg-light-green group-hover:bg-gray-200",
    },
  };

  const styles = variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative flex items-center gap-4
        rounded-full p-1.5
        transition-all duration-200
        hover:shadow-lg cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${styles.outer}
        ${className}
      `}
    >
      <div
        className={`
          flex-1 rounded-full px-5 py-2.5 transition-colors
          ${styles.inner}
        `}
      >
        <span className="text-[16px] font-bold tracking-wide uppercase">
          {text}
        </span>
      </div>

      {showArrow && (
        <div
          className={`
            rounded-full w-11 h-11 flex items-center justify-center
            transition-all group-hover:translate-x-1
            ${styles.arrow}
          `}
        >
          <img src="/image/button/arrow.png" alt="" />
        </div>
      )}
    </button>
  );
};
