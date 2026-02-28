"use client";

// shared/modal/AddCurrencyModal.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  MethodTab,
  PaymentMethodOption,
  AddCurrencyFormState,
} from "@/types/currency";
import ExchangeCurrency from "./ExchangeCurrency";
import { Button } from "../ui/Button";
import DepositeCurrency from "./DepositeCurrency";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAYMENT_METHODS: PaymentMethodOption[] = [
  "Paypal - USD",
  "Bank Transfer - USD",
  "Credit Card - USD",
  "Paypal - EUR",
  "Bank Transfer - EUR",
];

const DEPOSIT_LIMIT = "$10.00 – $10,000.00";
const EXCHANGE_LIMIT = "$10.00 – $10,000.00";
const TRANSACTION_FEE_RATE = 0.0005;
interface MethodToggleProps {
  active: MethodTab;
  onChange: (tab: MethodTab) => void;
}

const MethodToggle: React.FC<MethodToggleProps> = ({ active, onChange }) => (
  <div className="flex rounded-xl bg-gray-100 p-1 text-sm font-medium">
    {(["Exchange", "Deposit"] as MethodTab[]).map((tab) => (
      <button
        key={tab}
        type="button"
        onClick={() => onChange(tab)}
        className={`
          flex-1 rounded-lg py-2 transition-all duration-200 cursor-pointer
          ${
            active === tab
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }
        `}
      >
        {tab}
      </button>
    ))}
  </div>
);

interface AddCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (form: AddCurrencyFormState) => void;
}

const AddCurrencyModal: React.FC<AddCurrencyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [form, setForm] = useState<AddCurrencyFormState>({
    method: "Deposit",
    paymentMethod: "Paypal - USD",
    amount: "100.00",
    fromCurrency: "USD",
    toCurrency: "AUD",
    fromAmount: "10.00",
    toAmount: "9.00",
  });

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const numericAmount = parseFloat(form.amount) || 0;
  const fee = numericAmount * TRANSACTION_FEE_RATE;
  const total = numericAmount + fee;

  const handleConfirm = () => {
    onConfirm(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-[fadeSlideUp_0.25s_ease-out]">
        <div className="px-7 py-7">
          {/* Title */}
          <h2 className="mb-1 text-center text-2xl font-bold text-gray-800 tracking-tight">
            Add Currency
          </h2>
          <p className="mb-5 text-center text-sm text-gray-400">
            Select a method to add currency
          </p>

          <hr className="mb-5 border-gray-100" />

          {/* Method toggle */}
          <MethodToggle
            active={form.method}
            onChange={(method) => setForm((f) => ({ ...f, method }))}
          />
          {form.method === "Exchange" ? (
            <ExchangeCurrency
              exchangeLimit={EXCHANGE_LIMIT}
              transactionFeeRate={TRANSACTION_FEE_RATE}
              fromCurrency={form.fromCurrency}
              toCurrency={form.toCurrency}
              fromAmount={form.fromAmount}
              toAmount={form.toAmount}
              onChange={(data) =>
                setForm((prev) => ({
                  ...prev,
                  ...data,
                }))
              }
            />
          ) : (
            <>
              <DepositeCurrency
                paymentMethodValue={form.paymentMethod}
                depositeLimit={DEPOSIT_LIMIT}
                transactionFeeRate={TRANSACTION_FEE_RATE}
                amount={Number(form.amount)}
                options={PAYMENT_METHODS}
                onChange={(paymentMethod) =>
                  setForm((f) => ({ ...f, paymentMethod }))
                }
                onAmountChange={(amount) =>
                  setForm((f) => ({ ...f, amount: amount.toString() }))
                }
              />
            </>
          )}

          {/* Info rows */}

          <hr className="my-4 border-gray-100" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total</span>
            <span className="text-base font-bold text-gray-800">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              text="Cancel"
              onClick={onClose}
              variant="white"
              className="border"
            />
            <Button text="Confirm" onClick={handleConfirm} variant="dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCurrencyModal;
