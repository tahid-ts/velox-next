"use client";

import React from "react";
import { DataTable } from "../../table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { currencyTableData } from "@/data/data";
export interface CurrencyData {
  id: string;
  currency: string;
  convertedTo: string;
  amount: string;
  date: string;
}

const CurrencyRatesTable = () => {
  const columns: ColumnDef<CurrencyData>[] = [
    {
      accessorKey: "currency",
      header: "Currency",
      cell: ({ row }) => (
        <span className="font-plus_jakarta text-secondary py-4.5 ">
          {row.original.currency}
        </span>
      ),
    },
    {
      accessorKey: "convertedTo",
      header: "Converted To",
      cell: ({ row }) => (
        <span className="font-plus_jakarta text-secondary py-4.5">
          {row.original.convertedTo}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-plus_jakarta text-secondary py-4.5">
          {row.original.amount}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="font-plus_jakarta text-secondary py-4.5">
          {row.original.date}
        </span>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        data={currencyTableData}
        columns={columns}
        rowClassName="py-4.5!"
        cellClassName="py-4.5 border border-border"
        title="Live Currency Rates Powered by Market Data"
        noDataMessage="No currency rates found"
      />
    </div>
  );
};

export default CurrencyRatesTable;
