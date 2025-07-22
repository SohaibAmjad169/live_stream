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

<<<<<<< Updated upstream
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
=======
import { useQueryClient } from "@tanstack/react-query";
import { useUsers } from "../../../hooks/users/useUsers";
import { useUserById } from "../../../hooks/users/useUserById";
import { useAddUser } from "../../../hooks/users/useAddUser";
import { useUpdateUser } from "../../../hooks/users/useUpdateUser";
import { useUpdateUserStatus } from "../../../hooks/users/useUpdateUserStatus";

import {
  UserRow,
  ApiUser,
  AddUserPayload,
  UpdateUserPayload,
} from "../../../lib/userAPITypes";

import { saveAs } from "file-saver";
>>>>>>> Stashed changes

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
    status: (index % 3 === 0 ? "In-Active" : "Active") as "Active" | "In-Active",
    lastLogin: `02/${String(index).padStart(2, "0")}/24 at ${8 + (index % 12)}:00 pm`,
    dropdownActions: ["View details", "Edit Details", "Reset Password"],
    password: "********",
    plan: `Plan ${String.fromCharCode(65 + (index % 3))}`,
    purchaseDate: `10/${String(index).padStart(2, "0")}/2024`,
    expiryDate: `11/${String(index).padStart(2, "0")}/2024`,
  };
}),

<<<<<<< Updated upstream
]);
=======
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserForModal, setSelectedUserForModal] =
    useState<UserRow | null>(null);
>>>>>>> Stashed changes


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
<<<<<<< Updated upstream
=======
  const [successMessage, setSuccessMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers({ page: currentPage + 1, size: pageSize, q: searchQuery });

  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    error: userDetailsError,
  } = useUserById(selectedUserId);

  const { mutate: addUserMutation, isPending: isAddingUser } = useAddUser();
  const { mutate: updateUserMutation, isPending: isUpdatingUser } =
    useUpdateUser();
  const { mutate: updateUserStatusMutation, isPending: isUpdatingUserStatus } =
    useUpdateUserStatus();

  useEffect(() => {
    if (userDetails) {
      const mappedUser: UserRow = {
        id: userDetails._id,
        name: userDetails.name,
        company: userDetails.company ? userDetails.company.name : "N/A",
        role: userDetails.role,
        email: userDetails.email,
        joinedOn: userDetails.joinedOn,
        status: userDetails.isActive ? "Active" : "In-Active",
        lastLogin: userDetails.lastLogin,
        phone: userDetails.phone,
        address: userDetails.address,
        website: userDetails.website,
        plan: userDetails.subscriptionPlan,
        purchaseDate: userDetails.purchaseDate,
        expiryDate: userDetails.expiryDate,
      };
      setSelectedUserForModal(mappedUser);
    } else {
      setSelectedUserForModal(null);
    }
  }, [userDetails]);

  const mappedUsers: UserRow[] =
    usersData?.users?.map((apiUser: ApiUser) => ({
      id: apiUser._id,
      name: apiUser.name,
      company: apiUser.company ? apiUser.company.name : "N/A",
      role: apiUser.role,
      email: apiUser.email,
      joinedOn: apiUser.joinedOn,
      status: apiUser.isActive ? "Active" : "In-Active",
      lastLogin: apiUser.lastLogin,
      phone: apiUser.phone,
      address: apiUser.address,
      website: apiUser.website,
      plan: apiUser.subscriptionPlan,
      purchaseDate: apiUser.purchaseDate,
      expiryDate: apiUser.expiryDate,
      dropdownActions: [
        "View details",
        "Edit Details",
        "Reset Password",
        "Deactivate",
      ],
    })) || [];

  const actualTotalPages = Math.ceil((usersData?.totalCount || 0) / pageSize);
  const displayTotalPages = Math.min(actualTotalPages, 3);

  const paginatedRows = mappedUsers;
>>>>>>> Stashed changes

  const handleActionClick = (row: UserRow, action: string) => {
    setSelectedUser(row);
    switch (action) {
      case "View details":
        setDetailsOpen(true);
<<<<<<< Updated upstream
        break;
      case "Edit Details":
        setEditOpen(true);
=======
        setEditOpen(false);
        setResetOpen(false);
        setConfirmDeactivateOpen(false);
        break;
      case "Edit Details":
        setEditOpen(true);
        setDetailsOpen(false);
        setResetOpen(false);
        setConfirmDeactivateOpen(false);
>>>>>>> Stashed changes
        break;
      case "Reset Password":
        setResetOpen(true);
        break;
      case "Deactivate":
        setConfirmDeactivateOpen(true);
        break;
    }
  };

<<<<<<< Updated upstream
  const handleStatusChange = (id: string, newStatus: "Active" | "In-Active") => {
    setRows((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
=======
  const handleStatusChange = (
    id: string,
    newStatus: "Active" | "In-Active"
  ) => {
    updateUserStatusMutation(
      { userId: id, newStatus },
      {
        onSuccess: () => {
          setDetailsOpen(false);
          setSuccessMessage(
            `User successfully ${
              newStatus === "Active" ? "activated" : "deactivated"
            }!`
          );
          setSuccessModalOpen(true);
          setSelectedUserId(null);
        },
        onError: (err: any) => {
          console.error("Error changing user status:", err.message);
        },
      }
>>>>>>> Stashed changes
    );
    setSelectedUser((prev) => (prev?.id === id ? { ...prev, status: newStatus } : prev));
  };

<<<<<<< Updated upstream
  const handleSaveUser = (updated: UserRow) => {
    setRows((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
    setSelectedUser((prev) => (prev?.id === updated.id ? { ...updated } : prev));
=======
  const handleSaveUser = (updated: UpdateUserPayload & { userId: string }) => {
    updateUserMutation(
      { userId: updated.userId, updatedData: updated },
      {
        onSuccess: () => {
          setEditOpen(false);
          setSuccessMessage("User details updated successfully!");
          setSuccessModalOpen(true);
          setSelectedUserId(null);
        },
        onError: (error: any) => {
          console.error("Error saving user details:", error.message);
          alert(`Failed to save user: ${error.message || "Unknown error"}`);
        },
      }
    );
>>>>>>> Stashed changes
  };

  const handleConfirmDeactivate = () => {
    if (selectedUser) {
      handleStatusChange(selectedUser.id, "In-Active");
      setConfirmDeactivateOpen(false);
      setSuccessModalOpen(true);
    }
  };

<<<<<<< Updated upstream
  const handleAddUser = (newUser: UserRow) => {
    setRows((prev) => [...prev, { ...newUser, id: `${Date.now()}` }]);
    setAddUserOpen(false);
=======
  const handleAddUser = (newUser: AddUserPayload) => {
    addUserMutation(newUser, {
      onSuccess: () => {
        setAddUserOpen(false);
        setSuccessMessage("New user added successfully!");
        setSuccessModalOpen(true);
      },
      onError: (error: any) => {
        console.error("Error adding user:", error.message);
        alert(`Failed to add user: ${error.message || "Unknown error"}`);
      },
    });
>>>>>>> Stashed changes
  };

  const userStatusColors = {
    Active: "#19CE71",
    "In-Active": "#F24E1E",
  };

<<<<<<< Updated upstream
  return (
    <div className="flex flex-col gap-6">
      <UsersHeader onAddUserClick={() => setAddUserOpen(true)} />
=======
  if (isLoadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading users...
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600 text-lg font-semibold">
        Error loading users: {usersError.message}
        <button
          onClick={() => refetchUsers()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const handleDownloadList = async (format: string) => {
    if (!mappedUsers || mappedUsers.length === 0) {
      console.warn("No users to download.");
      return;
    }

    const fileName = `UsersList_${new Date().toISOString().split("T")[0]}`;

    if (format === "PDF") {
      try {
        const { default: jsPDF } = await import("jspdf");

        const doc = new jsPDF() as any;

        const startY = 20;
        const margin = 10;
        let y = startY;
        const lineHeight = 7;
        const headerHeight = 10;
        const cellPadding = 2;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);

        const columnWidths: { [key: string]: number } = {
          name: 30,
          company: 30,
          role: 25,
          email: 40,
          joinedOn: 25,
          status: 20,
          lastLogin: 40,
          actions: 20,
        };

        doc.setFillColor("#1E3A8A");
        doc.setTextColor("#FFFFFF");
        let currentX = margin;
        usersColumns.forEach((col) => {
          const width = columnWidths[col.key] || 25;
          doc.rect(currentX, y, width, headerHeight, "F");
          doc.text(col.label, currentX + cellPadding, y + headerHeight / 2 + 2);
          currentX += width;
        });
        y += headerHeight;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor("#000000");

        mappedUsers.forEach((user, rowIndex) => {
          currentX = margin;
          const rowHeight = lineHeight + 2 * cellPadding;

          if (y + rowHeight > doc.internal.pageSize.height - margin) {
            doc.addPage();
            y = startY;
            doc.setFillColor("#1E3A8A");
            doc.setTextColor("#FFFFFF");
            let headerX = margin;
            usersColumns.forEach((col) => {
              const width = columnWidths[col.key] || 25;
              doc.rect(headerX, y, width, headerHeight, "F");
              doc.text(
                col.label,
                headerX + cellPadding,
                y + headerHeight / 2 + 2
              );
              headerX += width;
            });
            y += headerHeight;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor("#000000");
          }

          doc.setFillColor(rowIndex % 2 === 0 ? "#F8F8F8" : "#FFFFFF");
          doc.rect(
            margin,
            y,
            doc.internal.pageSize.width - 2 * margin,
            rowHeight,
            "F"
          );

          usersColumns.forEach((col) => {
            const width = columnWidths[col.key] || 25;
            let value = String(user[col.key] ?? "");
            if (
              col.key === "company" &&
              typeof user.company === "object" &&
              user.company !== null
            ) {
              value = user.company.name || "N/A";
            } else if (col.key === "status") {
              value = user.status;
            } else if (col.key === "actions") {
              value = "View/Edit";
            }

            doc.rect(currentX, y, width, rowHeight);

            doc.text(
              value,
              currentX + cellPadding,
              y + cellPadding + lineHeight / 2
            );
            currentX += width;
          });
          y += rowHeight;
        });

        doc.save(`${fileName}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert(
          `Failed to generate PDF: ${
            error instanceof Error ? error.message : String(error)
          }. Please try again.`
        );
      }
    } else if (format === "CSV") {
      const csvHeader = usersColumns.map((col) => `"${col.label}"`).join(",");

      const csvRows = mappedUsers.map((user) => {
        return usersColumns
          .map((col) => {
            const value =
              user[col.key] !== undefined && user[col.key] !== null
                ? String(user[col.key])
                : "";
            if (
              col.key === "company" &&
              typeof user.company === "object" &&
              user.company !== null
            ) {
              return `"${(user.company as any).name || "N/A"}"`;
            } else if (col.key === "status") {
              return `"${user.status}"`;
            } else if (col.key === "actions") {
              return `"${"View/Edit"}"`;
            }

            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",");
      });

      const csvContent = [csvHeader, ...csvRows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${fileName}.csv`);
    } else if (format === "Excel") {
      const csvHeader = usersColumns.map((col) => `"${col.label}"`).join(",");
      const csvRows = mappedUsers.map((user) => {
        return usersColumns
          .map((col) => {
            const value =
              user[col.key] !== undefined && user[col.key] !== null
                ? String(user[col.key])
                : "";
            if (
              col.key === "company" &&
              typeof user.company === "object" &&
              user.company !== null
            ) {
              return `"${(user.company as any).name || "N/A"}"`;
            } else if (col.key === "status") {
              return `"${user.status}"`;
            } else if (col.key === "actions") {
              return `"${"View/Edit"}"`;
            }
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",");
      });

      const csvContent = [csvHeader, ...csvRows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${fileName}.xlsx`);
      console.warn(
        "For true Excel (.xlsx) files, consider a dedicated library like 'xlsx-js-style'. This generates a CSV with .xlsx extension."
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <UsersHeader
        onAddUserClick={() => setAddUserOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(0);
        }}
      />
>>>>>>> Stashed changes

      <DataTableCard<UserRow>
        columns={usersColumns}
        rows={paginatedRows}
        statusColorMap={userStatusColors}
        enableActions
        onActionClick={handleActionClick}
<<<<<<< Updated upstream
=======
        isLoading={
          isLoadingUsers ||
          isAddingUser ||
          isUpdatingUser ||
          isUpdatingUserStatus
        } // Pass loading states
>>>>>>> Stashed changes
      />

      <UserDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        user={selectedUser}
        onStatusChange={handleStatusChange}
      />

      <EditUserModal
        isOpen={editOpen}
<<<<<<< Updated upstream
        onClose={() => setEditOpen(false)}
        user={selectedUser}
=======
        onClose={() => {
          setEditOpen(false);
          setSelectedUserId(null);
        }}
        user={selectedUserForModal}
>>>>>>> Stashed changes
        onSave={handleSaveUser}
      />

      <ResetPasswordModal
        isOpen={resetOpen}
<<<<<<< Updated upstream
        onClose={() => setResetOpen(false)}
        user={selectedUser}
=======
        onClose={() => {
          setResetOpen(false);
          setSelectedUserId(null);
        }}
        user={selectedUserForModal}
>>>>>>> Stashed changes
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