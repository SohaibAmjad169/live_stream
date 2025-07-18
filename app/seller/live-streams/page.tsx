"use client";

import {useState } from "react";
import DataTableCard from "@/components/ui/DataTableCard";
import LiveStreamHeader from "@/components/ui/LiveStreamHeader";
import CreateSalesBreakModal from "@/components/ui/CreateSalesBreakModal";
import StreamDetailsModal from "@/components/ui/StreamDetailsModal";
import DirectSaleModal from "@/components/ui/DirectSaleModal";
import SellerFooter from "@/components/ui/SellerFooter";

const liveStreamColumns = [
  { label: "Stream Title", key: "streamTitle" },
  { label: "Date", key: "date" },
  { label: "Platform", key: "platform" },
  { label: "Sales", key: "sales" },
  { label: "Revenue", key: "revenue" },
  { label: "Profit", key: "profit" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

interface LiveStreamRow {
  id: number;
  streamTitle: string;
  date: string;
  platform: string;
  sales: string;
  revenue: string;
  profit: string;
  status:
    | "Active"
    | "Completed"
    | "draft"
    | "denied"
    | "in-review"
    | "approved";
  transactions: number;
  dropdownActions?: string[];
  [key: string]: string | string[] | number | undefined;
}

const streamTitles = [
  "Friday Frenzy",
  "Weekend Kickoff",
  "Late Night Sale",
  "TikTok Tuesday",
  "Instagram Live",
  "Mega Deal Hour",
  "Flash Sales Special",
  "Fanatics Friday",
  "Collectors' Night",
  "Unboxing Live",
  "Break & Chill",
  "Prime Picks",
  "Sunday Surprise",
  "Hobby Hits",
  "Mystery Drop",
  "Replay Special",
  "One Night Only",
  "Hot Picks Live",
  "Gold Rush Hour",
  "Final Call Live",
  "Streamline Sale",
  "Weekend Wrap-Up",
  "Streaming Gold",
  "Direct Deal Dive",
  "Next Big Break",
  "Insider Access",
  "Night Owl Deals",
  "Sellout Saturday",
  "Deal Stream",
  "Fan Live Drop",
  "Social Sale Blast",
  "Speed Round Deals",
  "Final Five",
  "Collectors Central",
  "Stream Ready",
  "Live Cart Push",
  "Hobby Highlight",
  "Rush Hour Box Break",
];

const allLiveStreamRows: LiveStreamRow[] = Array.from({ length: 38 }).map(
  (_, idx) => {
    const revenueNumber = Math.floor(Math.random() * 5000) + 500;
    const profitNumber = Math.floor(
      revenueNumber * (Math.random() * 0.2 + 0.1)
    );
    const statusOptions = [
      "draft",
      "approved",
      "in-review",
      "denied",
      "Completed",
      "Active",
    ];
    return {
      id: idx + 1,
      streamTitle: streamTitles[idx],
      date: `2/${(idx % 28) + 1}/2024`,
      platform:
        idx % 3 === 0 ? "TikTok" : idx % 3 === 1 ? "Instagram" : "Facebook",
      sales: `${Math.floor(Math.random() * 10) + 1}`,
      revenue: revenueNumber.toString(),
      profit: profitNumber.toString(),
      status: statusOptions[
        idx % statusOptions.length
      ] as LiveStreamRow["status"],
      transactions: Math.floor(Math.random() * 15) + 5,
      dropdownActions: ["View Details", "Create Break", "Direct Sales"],
    };
  }
);

const liveStreamStatusColors = {
  Active: "#F24E1E",
  Completed: "#19CE71",
  draft: "#9CA3AF",
  approved: "#10B981",
  "in-review": "#FBBF24",
  denied: "#EF4444",
};

export default function LiveStreams() {
  const [selectedRow, setSelectedRow] = useState<LiveStreamRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [breakModalOpen, setBreakModalOpen] = useState(false);
  const [directSaleModalOpen, setDirectSaleModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(allLiveStreamRows.length / pageSize);

  const paginatedRows = allLiveStreamRows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handleActionClick = (row: LiveStreamRow, action: string) => {
    setSelectedRow(row);
    if (action === "View Details") setModalOpen(true);
    else if (action === "Create Break") setBreakModalOpen(true);
    else if (action === "Direct Sales") setDirectSaleModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <LiveStreamHeader
        onCreate={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <DataTableCard<LiveStreamRow>
        columns={liveStreamColumns}
        rows={paginatedRows}
        statusColorMap={liveStreamStatusColors}
        enableActions
        onActionClick={handleActionClick}
        striped
      />

      {selectedRow && (
        <StreamDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          stream={{
            id: selectedRow.id,
            date: selectedRow.date,
            platform: selectedRow.platform,
            status: selectedRow.status,
            revenue: Number(selectedRow.revenue),
            profit: Number(selectedRow.profit),
            transactions: selectedRow.transactions,
          }}
        />
      )}

      <CreateSalesBreakModal
        isOpen={breakModalOpen}
        onClose={() => setBreakModalOpen(false)}
      />
      <DirectSaleModal
        isOpen={directSaleModalOpen}
        onClose={() => setDirectSaleModalOpen(false)}
      />

      <SellerFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
