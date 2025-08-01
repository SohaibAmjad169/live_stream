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