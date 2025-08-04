// File: src/components/charts/data-table.tsx

"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel, // Re-enabled for row pagination
  ColumnFiltersState,
  VisibilityState,
  PaginationState, // Import PaginationState
} from "@tanstack/react-table";

import { Card } from "@/components/ui/card"; // Assuming Card component is available
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"; // Assuming Input component is available
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Assuming Shadcn Table components

// --- Basic ScrollArea Component (Embedded) ---
// This component provides a scrollable container for the table.
interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ className, children, ...props }) => {
  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <div className="h-full w-full rounded-[inherit]">
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
// --- End of Basic ScrollArea Component ---


// Extend ColumnDef to include custom styling properties for headers and cells
export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  headerClassName?: string;
  cellClassName?: string;
};

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // State for row pagination (pageIndex and pageSize)
  const [rowPagination, setRowPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5, // Default rows per page
  });
  const [rowSelection, setRowSelection] = useState({});

  // Initialize the React Table instance
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable row pagination
    onColumnFiltersChange: setColumnFilters,
    // getFilteredRowModel: getFilteredRowModel(), // Keeping this if filtering is desired later
    // getFacetedRowModel: getFacetedRowModel(), // Keeping this if faceted filtering is desired later
    // getFacetedUniqueValues: getFacetedUniqueValues(), // Keeping this if faceted filtering is desired later
    // getFacetedMinMaxValues: getFacetedMinMaxValues(), // Keeping this if faceted filtering is desired later
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setRowPagination, // Handle row pagination state changes
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      pagination: rowPagination, // Connect pagination state to table
      rowSelection,
    },
  });

  // Handler for changing the number of rows displayed per page
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      table.setPageSize(value);
    } else if (e.target.value === "") {
      table.setPageSize(0); // Allow clearing the input
    }
  };

  return (
    <Card className="mt-4 w-full overflow-hidden rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Rows Per Page Input (Configurable) */}
        <div className="flex items-center space-x-2">
          <label htmlFor="rows-per-page" className="text-sm font-medium">Rows per page:</label>
          <Input
            id="rows-per-page"
            type="number"
            min="1"
            value={rowPagination.pageSize === 0 ? "" : rowPagination.pageSize}
            onChange={handleRowsPerPageChange}
            className="w-20 text-center"
          />
        </div>

        {/* Pagination Buttons (for Rows) */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-base"
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-base"
          >
            Next
          </Button>
        </div>

        {/* "Toggle Columns" Button (Solid) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-auto"> {/* Changed variant to "default" */}
              Toggle Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" && column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-lg py-2"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Scrollable area for the table content (increased height) */}
      <ScrollArea className="h-[600px] w-full">
        <div className="rounded-md border border-gray-300 overflow-hidden">
          <Table className="w-full border-collapse border border-gray-300">
            <TableHeader className="bg-[#8B0000] text-white"> {/* Dark Red Header */}
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      // Increased height, padding, and font size for headers
                      className="text-xl font-bold px-8 py-4 border-r border-b"
                      style={{ borderColor: '#D3D3D3' }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center text-lg py-8">
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    // Apply alternating row background colors
                    className={`${rowIndex % 2 === 0 ? 'bg-[#FDF5E6]' : 'bg-[#FFF0F5]'} hover:bg-gray-100 dark:hover:bg-zinc-900 border-b`}
                    style={{ borderColor: '#D3D3D3' }}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell
                        key={cell.id}
                        // Increased padding and font size for cells
                        className={`
                          p-8 text-lg border-r
                          ${cellIndex === 0 ? 'text-left font-semibold text-white' : 'text-right text-foreground'}
                        `}
                        style={{
                          backgroundColor: cellIndex === 0 ? '#A0522D' : (rowIndex % 2 === 0 ? '#FDF5E6' : '#FFF0F5'),
                          borderColor: '#D3D3D3'
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </Card>
  );
}
