"use client";

import { useState } from "react";
import DataTableCard from "@/components/ui/DataTableCard";
import UsersHeader from "@/components/ui/UsersHeader";
import UserDetailsModal from "@/components/ui/UserDetailsModal";
import EditUserModal from "@/components/ui/EditUserModal";
import ResetPasswordModal from "@/components/ui/ResetPasswordModal";
import DeactivateCompanyConfirmModal from "@/components/ui/DeactivateCompanyConfirmModal";
import SuccessModal from "@/components/ui/SuccessModal";
import AddUserModal from "@/components/ui/AddUserModal";
import DashboardFooter from "@/components/ui/DashboardFooter";

export interface UserRow {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  joinedOn: string;
  status: "Active" | "In-Active";
  lastLogin: string;
  dropdownActions?: string[];
  password?: string;
  plan?: string;
  purchaseDate?: string;
  expiryDate?: string;
  [key: string]: unknown;
}

const usersColumns = [
  { label: "Name", key: "name" },
  { label: "Company Name", key: "company" },
  { label: "Role", key: "role" },
  { label: "Email", key: "email" },
  { label: "Joined On", key: "joinedOn" },
  { label: "Status", key: "status" },
  { label: "Last Login", key: "lastLogin" },
  { label: "Actions", key: "actions" },
];

export default function Users() {
  const [rows, setRows] = useState<UserRow[]>([
    {
      id: "1",
      name: "John Vides",
      company: "Tech Sales",
      role: "Seller",
      email: "techsale@gmail.com",
      joinedOn: "12/6/24",
      status: "In-Active",
      lastLogin: "12/6/24 at 6:16 pm",
      dropdownActions: ["View details", "Edit Details", "Reset Password"],
      password: "password123",
      plan: "Plan A (1 admin+2 Sellers)",
      purchaseDate: "27/10/2024",
      expiryDate: "27/11/2024",
    },
    {
      id: "2",
      name: "Henry Back",
      company: "AB Streamer",
      role: "Company Admin",
      email: "AB@gmail.com",
      joinedOn: "12/5/22",
      status: "Active",
      lastLogin: "2/6/24 at 8:15 pm",
      dropdownActions: ["View details", "Edit Details", "Reset Password"],
      password: "********",
      plan: "Plan B",
      purchaseDate: "15/10/2024",
      expiryDate: "15/11/2024",
    },
    // 20 more entries
    ...Array.from({ length: 40 }, (_, i) => {
      const index = i + 3;
      return {
        id: index.toString(),
        name: `User ${index}`,
        company: `Company ${index}`,
        role: index % 2 === 0 ? "Seller" : "Company Admin",
        email: `user${index}@email.com`,
        joinedOn: `01/${String(index).padStart(2, "0")}/24`,
        status: (index % 3 === 0 ? "In-Active" : "Active") as
          | "Active"
          | "In-Active",
        lastLogin: `02/${String(index).padStart(2, "0")}/24 at ${
          8 + (index % 12)
        }:00 pm`,
        dropdownActions: ["View details", "Edit Details", "Reset Password"],
        password: "********",
        plan: `Plan ${String.fromCharCode(65 + (index % 3))}`,
        purchaseDate: `10/${String(index).padStart(2, "0")}/2024`,
        expiryDate: `11/${String(index).padStart(2, "0")}/2024`,
      };
    }),
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = rows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [confirmDeactivateOpen, setConfirmDeactivateOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);

  const handleActionClick = (row: UserRow, action: string) => {
    setSelectedUser(row);
    switch (action) {
      case "View details":
        setDetailsOpen(true);
        break;
      case "Edit Details":
        setEditOpen(true);
        break;
      case "Reset Password":
        setResetOpen(true);
        break;
      case "Deactivate":
        setConfirmDeactivateOpen(true);
        break;
    }
  };

  const handleStatusChange = (
    id: string,
    newStatus: "Active" | "In-Active"
  ) => {
    setRows((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
    setSelectedUser((prev) =>
      prev?.id === id ? { ...prev, status: newStatus } : prev
    );
  };

  const handleSaveUser = (updated: UserRow) => {
    setRows((prev) =>
      prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u))
    );
    setSelectedUser((prev) =>
      prev?.id === updated.id ? { ...updated } : prev
    );
  };

  const handleConfirmDeactivate = () => {
    if (selectedUser) {
      handleStatusChange(selectedUser.id, "In-Active");
      setConfirmDeactivateOpen(false);
      setSuccessModalOpen(true);
    }
  };

  const handleAddUser = (newUser: UserRow) => {
    setRows((prev) => [...prev, { ...newUser, id: `${Date.now()}` }]);
    setAddUserOpen(false);
  };

  const userStatusColors = {
    Active: "#19CE71",
    "In-Active": "#F24E1E",
  };

  return (
    <div className="flex flex-col gap-6">
      <UsersHeader onAddUserClick={() => setAddUserOpen(true)} />

      <DataTableCard<UserRow>
        columns={usersColumns}
        rows={paginatedRows}
        statusColorMap={userStatusColors}
        enableActions
        onActionClick={handleActionClick}
      />

      <UserDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        user={selectedUser}
        onStatusChange={handleStatusChange}
      />

      <EditUserModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <ResetPasswordModal
        isOpen={resetOpen}
        onClose={() => setResetOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <DeactivateCompanyConfirmModal
        isOpen={confirmDeactivateOpen}
        onClose={() => setConfirmDeactivateOpen(false)}
        onConfirm={handleConfirmDeactivate}
      />

      <AddUserModal
        isOpen={addUserOpen}
        onClose={() => setAddUserOpen(false)}
        onAdd={handleAddUser}
      />

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message="User deactivated successfully!"
      />

      <DashboardFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDownload={(format) => {
          console.log(`Downloading Users as ${format}`);
          // Implement download logic if needed
        }}
      />
    </div>
  );
}
