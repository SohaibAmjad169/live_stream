"use client";

import { useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SuccessModal from "@/components/ui/SuccessModal";
import DataTableCard from "@/components/ui/DataTableCard";
import EditShowModal from "@/components/ui/EditShowModal";
import DeleteShowModal from "@/components/ui/DeleteShowModal";
import MostUsedPlatformChart from "@/components/ui/MostUsedPlatformChart";
import OverviewLineChart from "@/components/ui/OverviewLineChart";
import PerformanceSummary from "@/components/ui/PerformanceSummary";
import Image from "next/image";
import plus from "@/public/plus-icon.svg";
import { initialShows } from "@/data/initialShows";

export interface ShowRow {
  id: string;
  date: string;
  platform: string;
  item: string;
  price: string;
  commission: string;
  status: "Completed" | "On Review" | "In Queue";
  dropdownActions?: string[];
  [key: string]: string | string[] | undefined;
}

const showColumns = [
  { label: "Date", key: "date" },
  { label: "Platform", key: "platform" },
  { label: "Item", key: "item" },
  { label: "Price", key: "price" },
  { label: "Commission", key: "commission" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

const statusColors = {
  Completed: "#19CE71",
  "On Review": "#F881A9",
  "In Queue": "#F7BE4A",
};

export default function SellerDashboard() {
  const [shows, setShows] = useState<ShowRow[]>(initialShows);
  const [selectedShow, setSelectedShow] = useState<ShowRow | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleActionClick = (row: ShowRow, action: string) => {
    setSelectedShow(row);
    if (action === "Edit Show") setEditModalOpen(true);
    if (action === "Delete Show") setDeleteModalOpen(true);
    if (action === "View Show") console.log("Viewing", row);
  };

  const handleUpdate = (updated: ShowRow) => {
    setShows((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditModalOpen(false);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1500);
  };

  const handleDelete = () => {
    if (!selectedShow) return;
    setShows((prev) => prev.filter((item) => item.id !== selectedShow.id));
    setDeleteModalOpen(false);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1500);
  };

  const data = [
    { name: "Jan", Sales: 320, Revenue: 250, Streams: 280 },
    { name: "Feb", Sales: 310, Revenue: 230, Streams: 330 },
    { name: "Mar", Sales: 280, Revenue: 200, Streams: 300 },
    { name: "Apr", Sales: 220, Revenue: 150, Streams: 260 },
    { name: "May", Sales: 200, Revenue: 180, Streams: 200 },
    { name: "Jun", Sales: 260, Revenue: 290, Streams: 220 },
    { name: "Jul", Sales: 330, Revenue: 360, Streams: 300 },
    { name: "Sept", Sales: 300, Revenue: 320, Streams: 310 },
    { name: "Oct", Sales: 260, Revenue: 290, Streams: 270 },
    { name: "Nov", Sales: 220, Revenue: 240, Streams: 230 },
    { name: "Dec", Sales: 190, Revenue: 210, Streams: 200 },
  ];

  const stats = [
    {
      bg: "#FFE2E5",
      iconBg: "#FA5A7D",
      icon: "/revenue.svg",
      amount: "$100k",
      label: "Total Revenue",
      change: "+8%",
      changeColor: "#FA5A7D",
    },
    {
      bg: "#FFF4DE",
      iconBg: "#FF947A",
      icon: "/profit.svg",
      amount: "$70k",
      label: "Total Profit",
      change: "+5%",
      changeColor: "#FF947A",
    },
    {
      bg: "#DCFCE7",
      iconBg: "#3CD856",
      icon: "/units-sold.svg",
      amount: "700",
      label: "Units Sold",
      change: "+12%",
      changeColor: "#3CD856",
    },
    {
      bg: "#F3E8FF",
      iconBg: "#BF83FF",
      icon: "/stream.svg",
      amount: "7000",
      label: "Streams Count",
      change: "+10%",
      changeColor: "#BF83FF",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-3xl font-bold text-[#05004E]">Dashboard</h1>
        <PrimaryButton
          text="Create Live Stream"
          icon={<Image src={plus} alt="plus" width={16} height={16} />}
        />
      </div>

      <PerformanceSummary
        title="This Month's Performance"
        subtitle="Based on recent sales"
        stats={stats}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <MostUsedPlatformChart />
        <OverviewLineChart
          data={data}
          title="Yearly Overview"
          filterLabel="This year"
          highlightDot={{
            xValue: "Jul",
            dataKey: "Revenue",
            value: 360,
            color: "#EF4444",
          }}
          lines={[
            { dataKey: "Sales", stroke: "#A700FF", label: "Sales" },
            { dataKey: "Revenue", stroke: "#EF4444", showDot: true, label: "Revenue" },
            { dataKey: "Streams", stroke: "#3CD856", label: "Streams" },
          ]}
          yDomain={[0, 400]}
        />
      </div>

      <DataTableCard<ShowRow>
        title="Recent Shows"
        columns={showColumns}
        rows={shows}
        enableActions
        statusColorMap={statusColors}
        onActionClick={handleActionClick}
      />

      <EditShowModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={selectedShow}
        onSave={handleUpdate}
      />

      <DeleteShowModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Action completed successfully!"
      />
    </div>
  );
}
