"use client";

// shared/chart/WalletDonutChart.tsx
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { TbTriangleFilled } from "react-icons/tb";

ChartJS.register(ArcElement, Tooltip);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WalletSegment {
  currency: string;
  value: number; // percentage share (0–100), segments should sum to ~100
  color: string; // hex or CSS colour
}

export interface WalletDonutChartProps {
  segments: WalletSegment[];
  totalBalance: string; // formatted display string e.g. "$123.45"
  changePercent: number; // e.g. 0.12  → shown as "+ 0.12%"
  /** Thickness of the donut ring as a fraction of radius (0–1). Default 0.58 */
  cutout?: string;
}

// ─── Centre-text plugin (inline) ──────────────────────────────────────────────
// We draw the centre text via an overlay div rather than a Chart.js plugin
// so it benefits from Tailwind typography without fighting canvas coords.

const WalletDonutChart: React.FC<WalletDonutChartProps> = ({
  segments,
  totalBalance,
  changePercent,
  cutout = "72%",
}) => {
  const isPositive = changePercent >= 0;

  const chartData: ChartData<"doughnut"> = {
    datasets: [
      {
        data: segments.map((s) => s.value),
        backgroundColor: segments.map((s) => s.color),
        borderColor: "transparent",
        borderWidth: 0,
        hoverOffset: 4,
        // rounded ends on first and last arc via borderRadius
        borderRadius: 6,
        spacing: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (item) => {
            const seg = segments[item.dataIndex];
            return ` ${seg.currency}: ${seg.value}%`;
          },
        },
        backgroundColor: "#1B3A2D",
        titleColor: "#fff",
        bodyColor: "#C8DDD2",
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
      },
    },
    animation: {
      animateRotate: true,
      duration: 900,
    },
  };

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-70 mx-auto">
      {/* Chart */}
      <Doughnut data={chartData} options={options} />

      {/* Centre overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        {/* Change indicator */}
        <span
          className={`flex items-center gap-0.5 text-sm font-semibold mb-1 ${
            isPositive ? "text-[#3DD68C]" : "text-red-500"
          }`}
        >
          <TbTriangleFilled
            size={10}
            className={isPositive ? "" : "rotate-180"}
          />
          {Math.abs(changePercent).toFixed(2)}%
        </span>

        {/* Balance */}
        <p className="text-[2rem] font-bold text-[#1B3A2D] leading-none tracking-tight">
          {totalBalance}
        </p>

        {/* Label */}
        <p className="mt-1.5 text-sm text-gray-400 font-medium">
          Total Balance
        </p>
      </div>
    </div>
  );
};

export default WalletDonutChart;
