"use client";

// shared/card/WalletCard.tsx
import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import WalletDonutChart, { WalletSegment } from "../chart/WalletDonutChart";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WalletCardProps {
  title?: string;
  segments: WalletSegment[];
  totalBalance: string;
  changePercent: number;
  onViewDetails?: () => void;
  className?: string;
}

// ─── Legend dot ───────────────────────────────────────────────────────────────

const LegendItem: React.FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <div className="flex items-center gap-2">
    <span
      className="inline-block h-3 w-3 rounded-full shrink-0"
      style={{ backgroundColor: color }}
    />
    <span className="text-sm font-medium text-gray-600">{label}</span>
  </div>
);

// ─── WalletCard ───────────────────────────────────────────────────────────────

const WalletCard: React.FC<WalletCardProps> = ({
  title = "Your Wallet",
  segments,
  totalBalance,
  changePercent,
  onViewDetails,
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-col w-full h-full rounded-2xl overflow-hidden
        border border-gray-100 shadow-sm bg-[#F4F7F2]
        ${className}
      `}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <h2 className="text-base font-semibold text-gray-800 tracking-tight">
          {title}
        </h2>

        <button
          type="button"
          onClick={onViewDetails}
          className="
            flex items-center gap-1.5 rounded-full border border-gray-200
            bg-white px-4 py-1.5 text-sm font-medium text-gray-700
            shadow-sm transition hover:border-gray-300 hover:shadow
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A2D]/30
          "
        >
          View Details
          <HiArrowRight size={14} />
        </button>
      </div>

      {/* ── Chart panel ── */}
      <div className="flex flex-col justify-between  w-full bg-white mx-0 rounded-b-2xl px-6 pt-8 pb-6 h-full">
        <div className="flex items-center justify-center h-full">
          {/* Donut chart */}
          <WalletDonutChart
            segments={segments}
            totalBalance={totalBalance}
            changePercent={changePercent}
          />
        </div>

        <div>
          {/* Divider */}
          <hr className="mt-6 mb-4 border-gray-100" />

          {/* Legend */}
          <div className="flex items-center justify-center gap-6">
            {segments.map((seg) => (
              <LegendItem
                key={seg.currency}
                color={seg.color}
                label={seg.currency}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
