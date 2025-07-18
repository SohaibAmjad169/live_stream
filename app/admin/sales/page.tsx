"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DashboardFooter from "@/components/ui/DashboardFooter";
import DataTableCard from "@/components/ui/DataTableCard";
import SalesHeader from "@/components/ui/AdminSalesHeader";
import SuccessModal from "@/components/ui/SuccessModal";
import StreamDetailsModal from "@/components/ui/StreamDetailsModal";

const salesColumns = [
  { label: "Date", key: "date" },
  { label: "Seller", key: "seller" },
  { label: "Platform", key: "platform" },
  { label: "Sales", key: "sales" },
  { label: "Revenue", key: "revenue" },
  { label: "Profit", key: "profit" },
  { label: "Year", key: "year" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

interface SalesRow {
  id: string;
  date: string;
  seller: string;
  platform: string;
  sales: number;
  revenue: string;
  profit: string;
  year: string;
  status: "Pending" | "Approved" | "Rejected";
  dropdownActions?: string[];
  [key: string]: string | number | string[] | undefined;
}

const initialSalesData: SalesRow[] = Array.from({ length: 28 }, (_, i) => ({
  id: uuidv4(),
  date: `1${i % 10 + 1}/5/2024`,
  seller: `Seller ${i + 1}`,
  platform: ["Tik Tok", "Instagram", "Whatnot"][i % 3],
  sales: (i % 5) + 1,
  revenue: `$${100 + i * 10}`,
  profit: `$${50 + i * 5}`,
  year: `${2020 + (i % 5)}`,
  status: ["Pending", "Approved", "Rejected"][i % 3] as SalesRow["status"],
  dropdownActions: ["View Details", "Accept Report", "Reject Report"],
}));

const statusColorMap = {
  Pending: "#FACC15",
  Approved: "#22C55E",
  Rejected: "#EF4444",
};

export default function ManageSales() {
  const [salesRows, setSalesRows] = useState<SalesRow[]>(initialSalesData);
  const [successMessage, setSuccessMessage] = useState("");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(salesRows.length / pageSize);

  const paginatedRows = salesRows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handleActionClick = (row: SalesRow, action: string) => {
    if (action === "Accept Report") {
      updateStatus(row.id, "Approved");
      setSuccessMessage("Report accepted successfully!");
    } else if (action === "Reject Report") {
      updateStatus(row.id, "Rejected");
      setSuccessMessage("Report rejected.");
    } else if (action === "View Details") {
      setDetailsModalOpen(true);
    }
  };

  const updateStatus = (id: string, newStatus: SalesRow["status"]) => {
    setSalesRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
    );
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(""), 2000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <div className="flex flex-col gap-6">
      <SalesHeader />

      <DataTableCard<SalesRow>
        columns={salesColumns}
        rows={paginatedRows}
        statusColorMap={statusColorMap}
        enableActions
        onActionClick={handleActionClick}
      />

      <DashboardFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDownload={(format) => {
          console.log(`Downloading Sales as ${format}`);
        }}
      />

      <SuccessModal
        isOpen={!!successMessage}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
      />

      <StreamDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        stream={{
          id: 0,
          date: "",
          platform: "",
          status: "",
          revenue: 0,
          profit: 0,
          transactions: 0,
        }}
      />
    </div>
  );
}
