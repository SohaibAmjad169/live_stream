"use client";

import { useState } from "react";
import AdminPerformanceSummary from "@/components/ui/AdminPerformanceSummary";
import RevenueProfitChart from "@/components/ui/RevenueProfitChart";
import TotalLiveStreams from "@/components/ui/TotalLiveStreams";
import PayPeriodRevenueChart from "@/components/ui/PayPeriodRevenueChart";
import InventoryGaugeCard from "@/components/ui/InventoryGaugeCard";
import { ChevronDown, ChevronUp } from "lucide-react";

type TimeFilter = "Current Pay Period" | "Last 30 Days" | "1 Year" | "All Time";

export default function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] =
    useState<TimeFilter>("Current Pay Period");

  return (
    <div className="flex flex-col gap-8">
      {/* Header + Filter */}
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-[#05004E] text-3xl xl:text-4xl font-semibold">
          Dashboard
        </h1>

        <div className="relative w-fit">
          <select
            value={selectedFilter}
            onChange={(e) => {
              setSelectedFilter(e.target.value as TimeFilter);
              setIsDropdownOpen(false);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setIsDropdownOpen(false)}
            className="appearance-none w-full pr-8 text-sm text-[#0B0B58] border border-[#D0D5DD] rounded-md px-4 py-2 hover:bg-gray-100 transition font-medium cursor-pointer"
          >
            <option>Current Pay Period</option>
            <option>Last 30 Days</option>
            <option>1 Year</option>
            <option>All Time</option>
          </select>

          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#0B0B58]">
            {isDropdownOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="flex flex-col xl:flex-row gap-2">
        <div className="w-full h-full min-h-[150px]">
          <AdminPerformanceSummary selectedFilter={selectedFilter} />
        </div>
      </div>

      {/* Other Cards */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-3">
          <RevenueProfitChart />
        </div>
        <div className="flex-2">
          <TotalLiveStreams />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-3">
          <PayPeriodRevenueChart />
        </div>
        <div className="flex-2">
          <InventoryGaugeCard />
        </div>
      </div>
    </div>
  );
}
