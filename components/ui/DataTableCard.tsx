"use client";

import React from "react";

type Column<T> = {
  label: string;
  key: keyof T;
};
type DataTableCardProps<T> = {
  columns: Column<T>[];
  rows: T[];
  statusColorMap?: Record<string, string>;
  enableActions?: boolean;
  onActionClick?: (row: T, action: string) => void;

  isLoading?: boolean;
};

  striped?: boolean; // ✅ new prop
  isLoading?: boolean;
}


export default function DataTableCard<T>({
  columns,
  rows,
  statusColorMap,
  enableActions = false,
  onActionClick,
  isLoading = false,
}: DataTableCardProps<T>) {
  return (

    <div className="overflow-x-auto border rounded-md p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-2 whitespace-nowrap">
                  {col.label}

    <div
      className="rounded-xl border border-[#F8F9FA] bg-white shadow-[0_4px_20px_0_#EEEEEE80] p-4 sm:p-6 w-full"
      style={{ minHeight }}
    >
      {title && (
        <h2 className="text-[#05004E] font-semibold text-xl sm:text-2xl mb-4 sm:mb-6 pb-2">
          {title}
        </h2>
      )}

      {total && <div className="mb-4">{total}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-[#1E3A8A] text-xs sm:text-sm border-b border-[#F2F3F9]">
              {columns.map((col) => (
                <th key={col.key} className="pb-2  sm:pb-3 whitespace-nowrap">
                  {col.label.toUpperCase()}

                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((col, colIndex) => {
                  const value = row[col.key];
                  const displayVal =
                    typeof value === "string"
                      ? value
                      : Array.isArray(value)
                      ? value.join(", ")
                      : value?.toString() ?? "—";

                  return (
                    <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                      {col.key === "status" && statusColorMap ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColorMap[value as string] || "bg-gray-200"
                          }`}
                        >
                          {displayVal}
                        </span>
                      ) : col.key === "dropdownActions" && enableActions ? (
                        <div className="flex gap-2">
                          {(value as string[])?.map((action, i) => (
                            <button
                              key={i}
                              className="text-blue-600 hover:underline text-xs"
                              onClick={() => onActionClick?.(row, action)}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      ) : (
                        displayVal
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}