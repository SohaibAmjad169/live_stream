"use client";

export default function AdminSalesHeader
() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full bg-[#F9FAFB] py-4 px-4 gap-4">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0B0B58]">
        Manage Sales
      </h1>

      <div className="flex gap-4">
        <div className="bg-[#DCFCE7] text-[#1B9C85] px-4 py-2 rounded-lg text-sm font-semibold">
          3 Pending Reports
        </div>
        <div className="bg-[#FFE2E5] text-[#FF4C61] px-4 py-2 rounded-lg text-sm font-semibold">
          $100k Total Revenue
        </div>
      </div>
    </div>
  );
}
