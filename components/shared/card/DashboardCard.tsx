import React from "react";
import { IconType } from "react-icons";

export type DashboardCardVariant = "green" | "orange" | "teal" | "purple";

export interface DashboardCardProps {
  variant: DashboardCardVariant;
  icon: IconType;
  label: string;
  value: string;
  onViewAll?: () => void;
  className?: string;
}

const variantStyles: Record<DashboardCardVariant, string> = {
  green: "bg-[#8DC63F]",
  orange: "bg-[#F4845F]",
  teal: "bg-[#4FC0C0]",
  purple: "bg-[#8B72BE]",
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  variant,
  icon: Icon,
  label,
  value,
  onViewAll,
  className = "",
}) => {
  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-2xl p-5 w-full h-57.5 overflow-hidden
        transition-transform duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white ">
          <Icon size={22} className="text-gray-700" />
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="
            rounded-full bg-white px-4 py-1.5
            text-xs font-semibold text-gray-700
            transition-all duration-200
             hover:scale-105 active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer
          "
        >
          View All
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-white/90 tracking-wide">
          {label}
        </p>
        <p className="mt-0.5 text-3xl font-bold text-white tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
