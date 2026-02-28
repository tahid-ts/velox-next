/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

/**
 * Configuration options for the DataTable component
 */
export interface DataTableConfig {
  /** Enable/disable search functionality */
  enableSearch?: boolean;
  /** Enable/disable column filtering */
  enableFiltering?: boolean;
  /** Enable/disable pagination */
  enablePagination?: boolean;
  /** Enable/disable sorting */
  enableSorting?: boolean;
  /** Default number of rows per page */
  defaultPageSize?: number;
  /** Available page size options */
  pageSizeOptions?: number[];
}

/**
 * Styling configuration for the DataTable component
 */
export interface DataTableStyles {
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  headerCellClassName?: string;
  bodyClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  searchContainerClassName?: string;
  searchInputClassName?: string;
  paginationClassName?: string;
}

/**
 * Event handlers for the DataTable component
 */
export interface DataTableCallbacks<TData> {
  /** Callback when a row is clicked */
  onRowClick?: (row: TData) => void;
  /** Callback when sorting changes */
  onSortingChange?: (sorting: any) => void;
  /** Callback when filters change */
  onFilterChange?: (filters: any) => void;
}

/**
 * Custom labels for the DataTable component
 */
export interface DataTableLabels {
  searchPlaceholder?: string;
  noDataMessage?: string;
  rowsPerPageLabel?: string;
  showingLabel?: string;
  ofLabel?: string;
  entriesLabel?: string;
  pageLabel?: string;
}

/**
 * Generic data table props combining all configuration options
 */
export interface DataTableProps<TData>
  extends
    DataTableConfig,
    DataTableStyles,
    DataTableCallbacks<TData>,
    DataTableLabels {
  /** The data to display in the table */
  data: TData[];
  /** Column definitions */
  columns: ColumnDef<TData, any>[];
}
