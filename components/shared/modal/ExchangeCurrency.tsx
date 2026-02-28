/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo } from "react";
import { InfoRow } from "./DepositeCurrency";

export interface Currency {
  code: string;
  flag: string;
  name: string;
}

const currencies: Currency[] = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen" },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee" },
  { code: "CNY", flag: "🇨🇳", name: "Chinese Yuan" },
];

const currencyToCountryCode: Record<string, string> = {
  USD: "us",
  AUD: "au",
  EUR: "eu",
  GBP: "gb",
  CAD: "ca",
  JPY: "jp",
  INR: "in",
  CNY: "cn",
};

const exchangeRates: Record<string, number> = {
  USD: 1,
  AUD: 0.9,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  JPY: 149.5,
  INR: 83.12,
  CNY: 7.24,
};

type ExchangeCurrencyProps = {
  className?: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  exchangeLimit: string;
  transactionFeeRate: number;
  onChange: (data: {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: string;
    toAmount: string;
  }) => void;
};

const ExchangeCurrency: React.FC<ExchangeCurrencyProps> = ({
  className,
  exchangeLimit,
  transactionFeeRate,
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  onChange,
}) => {
  const getCountryCode = (currencyCode: string): string =>
    currencyToCountryCode[currencyCode] || currencyCode.toLowerCase();

  const getExchangeRate = (from: string, to: string): number => {
    const fromRate = exchangeRates[from] || 1;
    const toRate = exchangeRates[to] || 1;
    return toRate / fromRate;
  };

  const calculateConvertedAmount = (
    amount: string,
    from: string,
    to: string,
  ): string => {
    const numericAmount = parseFloat(amount) || 0;
    if (!numericAmount) return "0.00";

    const rate = getExchangeRate(from, to);
    return (numericAmount * rate).toFixed(2);
  };

  /* ───────────────────────── Handlers ───────────────────────── */

  const handleFromAmountChange = (value: string) => {
    const calculated = calculateConvertedAmount(
      value,
      fromCurrency,
      toCurrency,
    );

    onChange({
      fromCurrency,
      toCurrency,
      fromAmount: value,
      toAmount: calculated,
    });
  };

  const handleToAmountChange = (value: string) => {
    const numericAmount = parseFloat(value) || 0;

    if (!numericAmount) {
      onChange({
        fromCurrency,
        toCurrency,
        fromAmount: "0.00",
        toAmount: value,
      });
      return;
    }

    const rate = getExchangeRate(toCurrency, fromCurrency);

    onChange({
      fromCurrency,
      toCurrency,
      fromAmount: (numericAmount * rate).toFixed(2),
      toAmount: value,
    });
  };

  const handleFromCurrencyChange = (value: string) => {
    const recalculated = calculateConvertedAmount(
      fromAmount,
      value,
      toCurrency,
    );

    onChange({
      fromCurrency: value,
      toCurrency,
      fromAmount,
      toAmount: recalculated,
    });
  };

  const handleToCurrencyChange = (value: string) => {
    const recalculated = calculateConvertedAmount(
      fromAmount,
      fromCurrency,
      value,
    );

    onChange({
      fromCurrency,
      toCurrency: value,
      fromAmount,
      toAmount: recalculated,
    });
  };

  const swapCurrencies = () => {
    onChange({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
      fromAmount: toAmount,
      toAmount: fromAmount,
    });
  };

  const exchangeRateDisplay = useMemo(() => {
    const rate = getExchangeRate(fromCurrency, toCurrency);
    return `1.00 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
  }, [fromCurrency, toCurrency]);

  /* ───────────────────────── UI ───────────────────────── */

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="flex flex-col gap-4 mt-8">
        {/* FROM */}
        <div className="border border-gray-300 px-6 py-4 rounded-sm">
          <label className="paragraph-xs text-secondary">You Send</label>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <img
                src={`https://flagcdn.com/48x36/${getCountryCode(
                  fromCurrency,
                )}.png`}
                alt={`${fromCurrency} flag`}
                className="w-8 h-6 object-cover"
              />

              <select
                value={fromCurrency}
                onChange={(e) => handleFromCurrencyChange(e.target.value)}
                className="bg-transparent outline-none cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="number"
              step="0.01"
              min="0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="text-right w-32 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={swapCurrencies}
            className="bg-border p-2 rounded-lg w-10"
          >
            ⇅
          </button>
        </div>

        {/* TO */}
        <div className="border border-gray-300 px-6 py-4 rounded-sm">
          <label className="paragraph-xs text-secondary">
            To This Currency
          </label>

          <div className="flex items-center justify-between gap-3 mt-2">
            <div className="flex items-center gap-2 flex-1">
              <img
                src={`https://flagcdn.com/48x36/${getCountryCode(
                  toCurrency,
                )}.png`}
                alt={`${toCurrency} flag`}
                className="w-8 h-6 object-cover"
              />

              <select
                value={toCurrency}
                onChange={(e) => handleToCurrencyChange(e.target.value)}
                className="bg-transparent outline-none cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="number"
              step="0.01"
              min="0"
              value={toAmount}
              onChange={(e) => handleToAmountChange(e.target.value)}
              className="text-right w-32 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Rate Display */}
        <div className="bg-border py-2 px-4 rounded-sm text-center">
          {exchangeRateDisplay}
        </div>
        <div className="mt-5 space-y-2 text-sm">
          <InfoRow label="Exchange Limit" value={exchangeLimit} />
          <InfoRow
            label="Transaction Fee"
            value={`${(transactionFeeRate * 100).toFixed(2)}%`}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeCurrency;
