// shared/card/AddCurrencyCard.tsx
import React from "react";
import { HiPlus } from "react-icons/hi2";

interface AddCurrencyCardProps {
  onClick?: () => void;
  className?: string;
}

const AddCurrencyCard: React.FC<AddCurrencyCardProps> = ({
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-3
        rounded-2xl w-full h-44
        bg-[#8B72BE] text-white
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:bg-[#7B60B0]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B72BE]/60 cursor-pointer
        ${className}
      `}
    >
      {/* Plus circle */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 transition group-hover:bg-white/35">
        <HiPlus size={26} className="text-white" />
      </div>

      <span className="text-sm font-semibold text-white/90">Add Currency</span>
    </button>
  );
};

export default AddCurrencyCard;
