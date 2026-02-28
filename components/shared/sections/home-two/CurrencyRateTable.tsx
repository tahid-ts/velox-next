"use client";
import React from "react";
import { DataTable } from "../../table/DataTable";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { LiveCurrencyRatesData } from "@/data/data";
export interface CurrencyData {
  id: string;
  currency: string;
  currencyCode: string;
  flag: string;
  rateByUSD: number;
}

const CurrencyRateTable = () => {
  const columns: ColumnDef<CurrencyData>[] = [
    {
      accessorKey: "currency",
      header: "Currency",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-3">
          <div className="flex  gap-2">
            <span className="text-secondary font-plus_jakarta">
              {row.getValue("currency")}
            </span>
            <span className="text-secondary font-plus_jakarta">
              ({row.original.currencyCode})
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "rateByUSD",
      header: "Rate by USD",
      cell: ({ row }) => {
        const rate = row.getValue("rateByUSD") as number;
        return (
          <span className="text-secondary  font-plus_jakarta">
            ${(rate || 0).toFixed(4)}
          </span>
        );
      },
    },
    {
      accessorKey: "change24h",
      header: "Change (24h)",
      cell: ({ row }) => {
        const change = (row.getValue("change24h") as number) || 0;
        const isPositive = change > 0;
        return (
          <div className="flex justify-center items-center gap-1">
            {isPositive ? (
              <ChevronUp className="w-4 h-4 text-green-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {isPositive ? "+" : ""}
              {(change || 0).toFixed(2)}%
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <DataTable
        data={LiveCurrencyRatesData}
        columns={columns}
        title="Live Currency Rates Powered by Market Data"
        noDataMessage="No currency rates found"
      />
    </div>
  );
};

export default CurrencyRateTable;
