"use client";

// shared/card/ChartCard.tsx
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import CurrencyRateChart, {
  RateDataPoint,
} from "../../dashboard/Currencyratechart";

export type CurrencyOption = "USD" | "EUR" | "GBP" | "JPY" | "CHF";
export type PeriodOption = "3 Months" | "6 Months" | "12 Months" | "2 Years";

export interface ChartCardProps {
  title: string;
  data: RateDataPoint[];
  currencies?: CurrencyOption[];
  periods?: PeriodOption[];
  defaultCurrency?: CurrencyOption;
  defaultPeriod?: PeriodOption;
  activeIndex?: number;

  onCurrencyChange?: (currency: CurrencyOption) => void;
  onPeriodChange?: (period: PeriodOption) => void;
  className?: string;
}

interface PillDropdownProps<T extends string> {
  value: T;
  options: T[];
  onChange: (val: T) => void;
}

function PillDropdown<T extends string>({
  value,
  options,
  onChange,
}: PillDropdownProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
       gap-0.5 rounded-full border border-gray-200
          bg-white px-5.5 py-2.75 text-sm font-medium text-gray-700  transition hover:border-gray-300 hover:shadow
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A2D]/30 flex items-center justify-center
        "
      >
        {value}
        <RiArrowDropDownLine
          size={20}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          className="
            absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden
            rounded-xl border border-gray-100 bg-white py-1 shadow-lg
          "
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`
                  w-full px-4 py-2 text-left text-sm transition
                  hover:bg-[#EEF4F1] hover:text-[#1B3A2D]
                  ${opt === value ? "font-semibold text-[#1B3A2D]" : "text-gray-600"}
                `}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── ChartCard ────────────────────────────────────────────────────────────────

const DEFAULT_CURRENCIES: CurrencyOption[] = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CHF",
];
const DEFAULT_PERIODS: PeriodOption[] = [
  "3 Months",
  "6 Months",
  "12 Months",
  "2 Years",
];

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  currencies = DEFAULT_CURRENCIES,
  periods = DEFAULT_PERIODS,
  defaultCurrency = "USD",
  defaultPeriod = "12 Months",
  activeIndex = 8,
  onCurrencyChange,
  onPeriodChange,
  className = "",
}) => {
  const [currency, setCurrency] = useState<CurrencyOption>(defaultCurrency);
  const [period, setPeriod] = useState<PeriodOption>(defaultPeriod);

  const handleCurrencyChange = (val: CurrencyOption) => {
    setCurrency(val);
    onCurrencyChange?.(val);
  };

  const handlePeriodChange = (val: PeriodOption) => {
    setPeriod(val);
    onPeriodChange?.(val);
  };

  return (
    <div
      className={`
        flex flex-col rounded-2xl bg-white 
        border h-full border-gray-100
        ${className}
      `}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 bg-border rounded-t-xl px-6 py-4.25">
        <h2 className=" label-md ">{title}</h2>

        <div className="flex items-center gap-2">
          <PillDropdown<CurrencyOption>
            value={currency}
            options={currencies}
            onChange={handleCurrencyChange}
          />
          <PillDropdown<PeriodOption>
            value={period}
            options={periods}
            onChange={handlePeriodChange}
          />
        </div>
      </div>

      {/* ── Chart Area ── */}
      <div className="relative w-full h-full p-6">
        <CurrencyRateChart data={data} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

export default ChartCard;
