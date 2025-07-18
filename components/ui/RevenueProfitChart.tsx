"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper: Convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Custom Legend Dot
const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor: hexToRgba(color, 0.15) }}
    >
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    </div>
    <span className="text-sm font-medium" style={{ color }}>{label}</span>
  </div>
);

// Updated: Shortened month names
const data = [
  { name: "Jan", Revenue: 36, Profit: 60 },
  { name: "Feb", Revenue: 12, Profit: 12 },
  { name: "Mar", Revenue: 57, Profit: 63 },
  { name: "Apr", Revenue: 11, Profit: 11 },
  { name: "May", Revenue: 32, Profit: 45 },
  { name: "Jun", Revenue: 90, Profit: 66 },
  { name: "Jul", Revenue: 17, Profit: 18 },
  { name: "Aug", Revenue: 90, Profit: 38 },
  { name: "Sep", Revenue: 45, Profit: 16 },
  { name: "Oct", Revenue: 78, Profit: 88 },
];

export default function RevenueProfitChart() {
  return (
    <div className="bg-white shadow-md rounded-xl px-6 pt-6 pb-14 relative h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-900">
          Total revenue and total profit
        </h2>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          2022
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Profit"
              stroke="#10b981"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="#4f46e5"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <div className="absolute bottom-[-30] left-1/2 -translate-x-1/2 flex gap-8 px-4 py-1 rounded-full">
          <LegendDot color="#10b981" label="Profit" />
          <LegendDot color="#4f46e5" label="Revenue" />
        </div>
      </div>
    </div>
  );
}
  