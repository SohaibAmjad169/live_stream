"use client";

import Image from "next/image";

interface StatItem {
  bg: string;
  iconBg: string;
  icon: string;
  amount: string;
  label: string;
  changeColor: string;
}

interface PerformanceSummaryProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
  showExport?: boolean;
}

export default function PerformanceSummary({
  title = "Overall Performance",
  subtitle = "Summary of this pay period",
  stats,
  showExport = true,
}: PerformanceSummaryProps) {
  return (
    <div className="flex flex-col justify-between h-full rounded-[20px] border bg-white border-[#F8F9FA] shadow-[0px_4px_20px_0px_#EEEEEE80] p-4 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[#05004E] font-semibold text-xl">{title}</h2>
          <p className="text-[#737791] text-sm mt-1">{subtitle}</p>
        </div>
        {showExport && (
          <button className="flex items-center gap-2 border border-[#E0E0E0] px-4 py-2 rounded-lg text-sm text-[#05004E] font-medium hover:bg-[#F5F6FA] transition">
            <Image src="/export.svg" alt="Export" width={16} height={16} />
            Export
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-[20px] px-3 py-5"
            style={{ backgroundColor: item.bg }}
          >
            <div className="">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: item.iconBg }}
              >
                <Image src={item.icon} alt="Icon" width={20} height={20} />
              </div>
              <div className="text-[#05004E] font-bold text-xl">
                {item.amount}
              </div>
            </div>
            <div className="text-[#05004E] text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
