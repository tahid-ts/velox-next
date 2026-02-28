/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use no memo";

import React, { useEffect, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  title?: string;
  // Feature toggles
  enableSearch?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;

  // Pagination config
  defaultPageSize?: number;
  pageSizeOptions?: number[];

  // Styling props
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  headerCellClassName?: string;
  bodyClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  searchContainerClassName?: string;
  searchInputClassName?: string;
  paginationClassName?: string;

  // Callbacks
  onRowClick?: (row: TData) => void;

  // Custom labels
  searchPlaceholder?: string;
  noDataMessage?: string;
}

export function DataTable<TData>({
  data,
  title,
  columns,
  enableSearch = false,
  enableFiltering = false,
  enablePagination = false,
  enableSorting = false,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  containerClassName = "",
  titleClassName = "",
  tableClassName = "",
  headerClassName = "",
  headerCellClassName = "",
  bodyClassName = "",
  rowClassName = "",
  cellClassName = "",
  searchContainerClassName = "",
  searchInputClassName = "",
  paginationClassName = "",
  onRowClick,
  searchPlaceholder = "Search...",
  noDataMessage = "No data available",
}: DataTableProps<TData>) {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableHeaderRef = useRef<HTMLTableSectionElement>(null);
  const rowRefs = useRef<HTMLTableRowElement[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      globalFilter: enableSearch ? globalFilter : undefined,
      pagination: enablePagination ? pagination : undefined,
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onGlobalFilterChange: enableSearch ? setGlobalFilter : undefined,
    onPaginationChange: enablePagination ? setPagination : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:
      enableFiltering || enableSearch ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
  });
  useEffect(() => {
    gsap.set(headerRef.current, { opacity: 0, y: -10 });
    gsap.set(tableHeaderRef.current, { opacity: 0, y: 20 });
    gsap.set(rowRefs.current, { opacity: 0, x: -20 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out",
    });
    tl.to(tableHeaderRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    tl.to(
      rowRefs.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: { each: 0.01, ease: "power2.out" },
      },
      "-=0.3",
    );
  }, []);
  const handleRowHover = (index: number, isEntering: boolean) => {
    const row = rowRefs.current[index];
    if (!row) return;

    gsap.to(row, {
      backgroundColor: isEntering ? "#e8f5f5" : "#ffffff",
      duration: 0.25,
      ease: "power2.out",
    });
  };
  return (
    <div className={`w-full ${containerClassName}`}>
      {/* Search Bar */}
      {enableSearch && (
        <div className={searchContainerClassName || "mb-6 relative"}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className={
              searchInputClassName ||
              "w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            }
          />
        </div>
      )}

      {/* Table */}
      <div
        className={`w-full label-sm px-6 py-4.25 text-white rounded-t-xl ${titleClassName ? titleClassName : "bg-teal"}`}
      >
        {title}
      </div>
      <div
        className={`overflow-x-auto overflow-y-hidden   text-center ${!enablePagination && "rounded-b-xl"}`}
      >
        <table
          className={tableClassName || "w-full text-center border-collapse"}
        >
          <thead ref={tableHeaderRef} className={headerClassName || "bg-white"}>
            {table.getHeaderGroups().map((headerGroup, rowIndex) => (
              <tr
                key={headerGroup.id}
                ref={(el) => {
                  if (el) rowRefs.current[rowIndex] = el;
                }}
                onMouseEnter={() => handleRowHover(rowIndex, true)}
                onMouseLeave={() => handleRowHover(rowIndex, false)}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={
                      headerCellClassName ||
                      "px-6 py-4 text-center label-md text-black tracking-wide border border-border border-t-0  "
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          enableSorting && header.column.getCanSort()
                            ? "flex items-center justify-center gap-2 cursor-pointer select-none hover:text-teal-100 transition-colors"
                            : "flex items-center justify-center gap-2"
                        }
                        onClick={
                          enableSorting
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {enableSorting && header.column.getCanSort() && (
                          <span className="ml-auto">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="w-4 h-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="w-4 h-4" />
                            ) : (
                              <ArrowUpDown className="w-4 h-4 opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className={
              bodyClassName || "bg-white divide-y divide-gray-100 text-center "
            }
          >
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4.5 text-center text-gray-500 text-sm "
                >
                  {noDataMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={
                    rowClassName ||
                    `hover:bg-gray-50 transition-colors  text-center ${onRowClick ? "cursor-pointer" : ""}`
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={
                        cellClassName ||
                        "px-6 py-2.5 paragraph-md border border-border text-center"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div
          className={
            paginationClassName ||
            " flex flex-col sm:flex-row items-center justify-between gap-4 bg-white py-6 px-6 rounded-b-xl"
          }
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <select
              value={pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="ml-4">
              Showing{" "}
              {table.getRowModel().rows.length === 0
                ? 0
                : pagination.pageIndex * pagination.pageSize + 1}{" "}
              to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}{" "}
              of {table.getFilteredRowModel().rows.length} entries
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 text-green hover:bg-green hover:text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* First Page */}
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-2 text-sm font-medium text-green hover:bg-green hover:text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              First
            </button>

            {/* Page Numbers with Active State */}
            {table.getPageOptions().map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => table.setPageIndex(pageIndex)}
                className={`px-3.5 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors ${
                  pagination.pageIndex === pageIndex
                    ? "bg-green text-white"
                    : "text-green hover:bg-green hover:text-white"
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}

            {/* Last Page */}
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-2 text-sm font-medium text-green hover:bg-green hover:text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Last
            </button>

            {/* Next Page Button */}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 text-green hover:bg-green hover:text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
