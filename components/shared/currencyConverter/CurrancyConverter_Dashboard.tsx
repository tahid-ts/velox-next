/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Button } from "../ui/Button";
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

// Map currency codes to country codes for flag display
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

const formatTimestamp = () =>
  new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
type currancyConverterProps = {
  className?: string;
};
const CurrancyConverter_Dashboard: React.FC<currancyConverterProps> = ({
  className,
}) => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("AUD");
  const [fromAmount, setFromAmount] = useState("10.00");
  const [toAmount, setToAmount] = useState("9.00");

  const lastUpdated = useMemo(() => formatTimestamp(), []);

  const getCountryCode = (currencyCode: string): string => {
    return currencyToCountryCode[currencyCode] || currencyCode.toLowerCase();
  };

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
    if (numericAmount === 0) return "0.00";

    const rate = getExchangeRate(from, to);
    const converted = numericAmount * rate;
    return converted.toFixed(2);
  };

  useEffect(() => {
    const calculated = calculateConvertedAmount(
      fromAmount,
      fromCurrency,
      toCurrency,
    );
    setToAmount(calculated);
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    const calculated = calculateConvertedAmount(
      value,
      fromCurrency,
      toCurrency,
    );
    setToAmount(calculated);
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    const numericAmount = parseFloat(value) || 0;
    if (numericAmount === 0) {
      setFromAmount("0.00");
      return;
    }

    const rate = getExchangeRate(toCurrency, fromCurrency);
    const converted = numericAmount * rate;
    setFromAmount(converted.toFixed(2));
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value);
  };

  const swapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const exchangeRateDisplay = useMemo(() => {
    const rate = getExchangeRate(fromCurrency, toCurrency);
    return `1.00 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
  }, [fromCurrency, toCurrency]);

  return (
    <div className="w-full lg:max-w-5xl h-full z-50">
      <div className="bg-border rounded-t-2xl h-15 px-6 py-10 flex items-center">
        <h1 className="font-plus_jakarta label-md  ">Quick Exchange</h1>
      </div>
      <div className="lg:px-8 px-5 py-6 bg-white rounded-b-2xl">
        <div className="pb-6 ">
          <h1 className="heading-sm text-black">Currency Converter</h1>
          <p className="text-gray-500">Last updated {lastUpdated}</p>
        </div>
        <div className={`grid md:grid-cols-3 gap-8.25 mb-6 ${className}`}>
          {/* FROM */}
          <div className="bg-[#03342814] p-5 rounded-sm w-full flex flex-col justify-between  h-24">
            <label className="paragraph-xs text-black">
              From This Currency
            </label>
            <div className="flex justify-between items-center gap-3 ">
              <input
                type="number"
                step="0.01"
                min="0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="paragraph-md outline-none flex-1 min-w-0"
                placeholder="0.00"
              />
              <div className="flex items-center gap-2 shrink-0 bg-white p-1.5 rounded-md">
                <img
                  src={`https://flagcdn.com/48x36/${getCountryCode(fromCurrency)}.png`}
                  alt={`${fromCurrency} flag`}
                  className="w-8 h-6 object-cover"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => handleFromCurrencyChange(e.target.value)}
                  className="paragraph-md bg-transparent border-none outline-none cursor-pointer pr-1"
                >
                  {currencies.map((c) => (
                    <option
                      key={c.code}
                      value={c.code}
                      className="paragraph-md"
                    >
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* TO */}
          <div className="bg-[#03342814] p-5 rounded-sm flex flex-col  justify-between h-24">
            <label className="paragraph-xs text-secondary">
              To This Currency
            </label>
            <div className="flex justify-between items-center gap-3">
              <input
                type="number"
                step="0.01"
                min="0"
                value={toAmount}
                onChange={(e) => handleToAmountChange(e.target.value)}
                className="paragraph-md outline-none flex-1 min-w-0"
                placeholder="0.00"
              />
              <div className="flex items-center gap-2 shrink-0 bg-white p-1.5 rounded-md">
                <img
                  src={`https://flagcdn.com/48x36/${getCountryCode(toCurrency)}.png`}
                  alt={`${toCurrency} flag`}
                  className="w-8 h-6 object-cover"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => handleToCurrencyChange(e.target.value)}
                  className="paragraph-md bg-transparent border-none outline-none cursor-pointer pr-1 paragraph-md"
                >
                  {currencies.map((c) => (
                    <option
                      key={c.code}
                      value={c.code}
                      className="paragraph-md"
                    >
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* RATE */}
          <div className="bg-[#03342814] p-5 rounded-sm flex flex-col items-start justify-center h-24">
            <label className="paragraph-xs text-secondary">
              To This Currency
            </label>
            <div className="paragraph-md">{exchangeRateDisplay}</div>
          </div>
        </div>
        <Button onClick={swapCurrencies} variant="teal" className="w-full" />
      </div>
    </div>
  );
};

export default CurrancyConverter_Dashboard;
