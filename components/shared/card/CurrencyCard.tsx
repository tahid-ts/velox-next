/* eslint-disable @next/next/no-img-element */
"use client";

// shared/card/CurrencyCard.tsx
import React, { useRef, useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbTriangleFilled } from "react-icons/tb";
import { CardVariant, CurrencyCardData } from "@/types/currency";
import Sparkline from "../ui/SparkLine";

// ─── Variant styles ───────────────────────────────────────────────────────────

const variantMap: Record<CardVariant, string> = {
  green: "bg-[#8DC63F]",
  orange: "bg-[#F4845F]",
  teal: "bg-[#4FC0C0]",
  purple: "bg-[#8B72BE]",
};

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
interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: () => void;
  onWithdraw: () => void;
  onExchange: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

interface CurrencyCardProps extends CurrencyCardData {
  onDeposit?: (id: number) => void;
  onWithdraw?: (id: number) => void;
  onExchange?: (id: number) => void;
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  onDeposit,
  onWithdraw,
  onExchange,
  anchorRef,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="
        absolute right-0 top-0 z-30 w-32
        rounded-xl bg-white shadow-xl border border-gray-100
        py-1 overflow-hidden
      "
    >
      <button
        type="button"
        onClick={onDeposit}
        className="
          w-full px-3 py-2 text-left
          flex items-center gap-2
        "
      >
        <span className="w-full rounded-full bg-[#1B3A2D] px-3 py-1 text-center text-xs font-semibold text-white">
          Deposit
        </span>
      </button>
      {[
        { label: "Withdraw", action: onWithdraw },
        { label: "Exchange", action: onExchange },
      ].map(({ label, action }) => (
        <button
          key={label}
          type="button"
          onClick={action}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

// ─── CurrencyCard ─────────────────────────────────────────────────────────────

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  id,
  variant,
  flagEmoji,
  currencyName,
  symbol,
  amount,
  changePercent,
  sparkline,
  onDeposit,
  onWithdraw,
  onExchange,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const isPositive = changePercent >= 0;
  const getCountryCode = (currencyCode: string): string => {
    return currencyToCountryCode[currencyCode] || currencyCode.toLowerCase();
  };
  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-2xl p-4 w-full h-44 overflow-hidden
        transition-transform duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        ${variantMap[variant]}
      `}
    >
      {/* ── Top row ── */}
      <div className="flex items-start justify-between">
        {/* Flag */}
        {/* <span className="text-3xl leading-none">{flagEmoji}</span> */}
        <img
          src={`https://flagcdn.com/48x36/${getCountryCode(flagEmoji)}.png`}
          alt={`${flagEmoji} flag`}
          className="w-8 h-6 object-cover"
        />
        <div className="relative">
          <button
            ref={menuBtnRef}
            type="button"
            aria-label="Card options"
            onClick={() => setMenuOpen((o) => !o)}
            className="
              flex h-7 w-7 items-center justify-center
               bg-white rounded-lg text-black
              transition hover:bg-white/50 cursor-pointer
            "
          >
            <BsThreeDotsVertical size={14} />
          </button>

          <DropdownMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            anchorRef={menuBtnRef}
            onDeposit={() => {
              setMenuOpen(false);
              onDeposit?.(id);
            }}
            onWithdraw={() => {
              setMenuOpen(false);
              onWithdraw?.(id);
            }}
            onExchange={() => {
              setMenuOpen(false);
              onExchange?.(id);
            }}
          />
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div>
        {/* Currency name + change */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-white/80">
            {currencyName}
          </span>
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              isPositive ? "text-white" : "text-white"
            }`}
          >
            <TbTriangleFilled
              size={8}
              className={isPositive ? "" : "rotate-180"}
            />
            {Math.abs(changePercent).toFixed(2)}%
          </span>
        </div>

        {/* Amount + sparkline */}
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-white tracking-tight">
            {symbol}&nbsp;{amount.toLocaleString()}
          </p>
          <Sparkline data={sparkline} />
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
