"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Shortened month names
const data = [
  { month: "Jan", streams: 80 },
  { month: "Feb", streams: 40 },
  { month: "Mar", streams: 45 },
  { month: "Apr", streams: 100 },
  { month: "May", streams: 75 },
];

export default function TotalLiveStreams() {
  const [selectedRange] = useState("Jan - May");

  return (
    <div className="bg-white shadow-md rounded-xl px-6 pt-6 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-900">
          Total Live Streams
        </h2>

        <div className="relative">
          <button className="flex items-center border border-gray-300 rounded-md px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
            {selectedRange}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="streams" fill="#6366F1" name="Live Streams" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
