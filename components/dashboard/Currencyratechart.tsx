/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// shared/chart/CurrencyRateChart.tsx
import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type TooltipItem,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RateDataPoint {
  month: string;
  rate: number;
  change: number; // percentage, e.g. 0.12
}

export interface CurrencyRateChartProps {
  data: RateDataPoint[];
  /** Index of the highlighted / active data point */
  activeIndex?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BRAND_DARK = "#1B3A2D";
const BRAND_MID = "#4A7C5F";
const BRAND_LIGHT = "#C8DDD2";

const CurrencyRateChart: React.FC<CurrencyRateChartProps> = ({
  data,
  activeIndex = 8, // October by default
}) => {
  const chartRef = useRef<ChartJS<"line">>(null);

  const labels = data.map((d) => d.month);
  const values = data.map((d) => d.rate);

  // Build gradient inside the canvas
  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: { top: number; bottom: number },
  ) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    );
    gradient.addColorStop(0, `${BRAND_MID}55`);
    gradient.addColorStop(1, `${BRAND_MID}00`);
    return gradient;
  };

  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: BRAND_DARK,
        borderWidth: 2,
        pointRadius: (ctx) => (ctx.dataIndex === activeIndex ? 7 : 0),
        pointHoverRadius: 7,
        pointBackgroundColor: "#fff",
        pointBorderColor: BRAND_DARK,
        pointBorderWidth: 2,
        fill: true,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return `${BRAND_MID}33`;
          return getGradient(canvasCtx, chartArea);
        },
        tension: 0.35,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: BRAND_DARK,
        titleColor: "#fff",
        titleFont: { weight: "bold", size: 13 },
        bodyColor: "#CBD5D0",
        bodyFont: { size: 12 },
        padding: { top: 10, bottom: 12, left: 14, right: 14 },
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: (items: TooltipItem<"line">[]) => items[0]?.label ?? "",
          label: (item: TooltipItem<"line">) => {
            const idx = item.dataIndex;
            const point = data[idx];
            const sign = point.change >= 0 ? "▲" : "▼";
            return [
              `Rate    :  ${point.rate.toFixed(4)}`,
              `Change: ${sign} ${Math.abs(point.change).toFixed(2)}%`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#8A9E94",
          font: { size: 12 },
        },
      },
      y: {
        position: "left",
        grid: {
          color: "#E8EDEB",
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: "#8A9E94",
          font: { size: 12 },
          stepSize: 10,
          padding: 8,
        },
        min: 0,
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default CurrencyRateChart;
