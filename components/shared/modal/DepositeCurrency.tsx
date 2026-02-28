"use client";
import { PaymentMethodOption } from "@/types/currency";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
interface CustomSelectProps {
  paymentMethodValue: PaymentMethodOption;
  amount: number;
  depositeLimit: string;
  transactionFeeRate: number;
  options: PaymentMethodOption[];
  onChange: (val: PaymentMethodOption) => void;
  onAmountChange: (val: number) => void;
}

const DepositeCurrency: React.FC<CustomSelectProps> = ({
  paymentMethodValue,
  options,
  amount,
  depositeLimit,
  transactionFeeRate,
  onChange,
  onAmountChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Payment Method
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between 
          rounded-xl border border-gray-200 bg-white
          px-4 py-3 text-sm text-gray-700
          hover:border-gray-300 transition
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A2D]/20"
        >
          {paymentMethodValue}
          <RiArrowDropDownLine
            size={22}
            className={`text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt); // ✅ Payment method change
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition
                  hover:bg-[#F0F7F3] hover:text-[#1B3A2D]
                  ${
                    opt === paymentMethodValue
                      ? "font-semibold text-[#1B3A2D]"
                      : "text-gray-600"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Amount Section */}
      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Deposit Amount
        </label>

        <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#8DC63F] focus-within:ring-2 focus-within:ring-[#8DC63F]/20 transition">
          <span className="mr-1 text-sm text-gray-400">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-5 space-y-2 text-sm">
        <InfoRow label="Deposite Limit" value={depositeLimit} />
        <InfoRow
          label="Transaction Fee"
          value={`${(transactionFeeRate * 100).toFixed(2)}%`}
        />
      </div>
    </div>
  );
};

export default DepositeCurrency;

export const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex items-center justify-between text-gray-500">
    <span>{label}</span>
    <span className="font-medium text-gray-700">{value}</span>
  </div>
);
