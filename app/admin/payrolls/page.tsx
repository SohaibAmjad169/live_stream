"use client";

import { useState } from "react";
import DashboardFooter from "@/components/ui/DashboardFooter";
import DataTableCard from "@/components/ui/DataTableCard";
import PayrollHeader from "@/components/ui/PayrollHeader";
import EditHoursModal from "@/components/ui/EditHoursModal";

interface PayrollRow {
  id: string;
  employee: string;
  paymentType: "Hourly" | "Commission";
  revenue: string;
  profit: string;
  hoursOrCommission: string;
  calculatedPay: string;
  dropdownActions?: string[];
  [key: string]: string | string[] | undefined;
}

const payrollColumns = [
  { label: "Employee Name", key: "employee" },
  { label: "Payment Type", key: "paymentType" },
  { label: "Revenue", key: "revenue" },
  { label: "Profit", key: "profit" },
  { label: "Hrs/Commission", key: "hoursOrCommission" },
  { label: "Calculated Pay", key: "calculatedPay" },
  { label: "Actions", key: "actions" },
];

const initialPayrollData: PayrollRow[] = Array.from({ length: 24 }, (_, i) => ({
  id: `${i + 1}`,
  employee: `Employee ${i + 1}`,
  paymentType: i % 2 === 0 ? "Commission" : "Hourly",
  revenue: `$${500 + i * 10}`,
  profit: `$${100 + i * 5}`,
  hoursOrCommission: i % 2 === 0 ? `${10 + i}%` : `${20 + i}$/hr`,
  calculatedPay: `$${600 + i * 12}`,
  dropdownActions: ["Edit Hours"],
}));

export default function ManagePayrolls() {
  const [rows, setRows] = useState<PayrollRow[]>(initialPayrollData);
  const [selectedRow, setSelectedRow] = useState<PayrollRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(rows.length / pageSize);

  const paginatedRows = rows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handleActionClick = (row: PayrollRow, action: string) => {
    if (action === "Edit Hours") {
      setSelectedRow(row);
      setModalOpen(true);
    }
  };

  const handleHoursUpdate = (newHours: string) => {
    if (!selectedRow) return;

    const updated = rows.map((r) =>
      r.id === selectedRow.id
        ? { ...r, hoursOrCommission: `${newHours}$/hr` }
        : r
    );
    setRows(updated);
    setModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <PayrollHeader />

      <DataTableCard<PayrollRow>
        columns={payrollColumns}
        rows={paginatedRows}
        enableActions
        onActionClick={handleActionClick}
      />

      <EditHoursModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleHoursUpdate}
        initialValue={
          selectedRow?.paymentType === "Hourly"
            ? selectedRow.hoursOrCommission.replace("$/hr", "")
            : ""
        }
      />

      <DashboardFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDownload={(format) => {
          console.log(`Downloading Payroll as ${format}`);
        }}
      />
    </div>
  );
}