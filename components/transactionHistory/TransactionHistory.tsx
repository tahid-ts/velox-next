"use client";
import React, { Suspense } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { currencyData } from "@/data/data";
import { DataTableSkeleton } from "../shared/skeleton/DataTableSkeleton";
import { DataTable } from "../shared/table/DataTable";
export interface SparkPoint {
  change24h: number;
  chartData: number;
}
export interface CurrencyData {
  id: string;
  currency: string;
  currencyCode: string;
  flag: string;
  rateByUSD: number;
  change24h: number;
  chartData: number;
  sparkline: SparkPoint[];
}

const TransactionHistory: React.FC = ({}) => {
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
    {
      id: "chart",
      header: "Chart",
      cell: () => {
        return (
          <div className="flex items-center justify-center">
            <h1>row</h1>
          </div>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            className="px-4 py-2 hover:bg-teal-800 rounded-full transition-colors font-plus_jakarta bg-teal text-white  cursor-pointer"
            onClick={() => console.log("More options", row.original)}
            title="More options"
          >
            Exchange
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Suspense
        fallback={<DataTableSkeleton rows={5} columns={columns.length} />}
      >
        {currencyData && (
          <DataTable
            data={currencyData}
            columns={columns}
            titleClassName="bg-[#E8EBE4] text-black!"
            enablePagination
            enableFiltering
            title="Transaction History"
            noDataMessage="No currency rates found"
          />
        )}
      </Suspense>
    </div>
  );
};

export default TransactionHistory;
