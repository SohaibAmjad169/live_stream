"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DashboardFooter from "@/components/ui/DashboardFooter";
import DataTableCard from "@/components/ui/DataTableCard";
import AdminInventoryHeader from "@/components/ui/AdminInventoryHeader";
import EditInventoryItemModal from "@/components/ui/EditInventoryItemModal";
import DeleteInventoryItemModal from "@/components/ui/DeleteInventoryItemModal";
import AddInventoryItemModal from "@/components/ui/AddInventoryItemModal";
import SuccessModal from "@/components/ui/SuccessModal";

export interface InventoryItem {
  item: string;
  sport: string;
  manufacturer: string;
  year: string;
  price: string;
  quantity: string;
  status: "In stock" | "Out of stock";
}

export interface InventoryRow extends InventoryItem {
  id: string;
  dropdownActions?: string[];
  [key: string]: string | string[] | undefined;
}

const inventoryColumns = [
  { label: "Item", key: "item" },
  { label: "Sport Category", key: "sport" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Year", key: "year" },
  { label: "Price", key: "price" },
  { label: "Quantity", key: "quantity" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

const inventoryStatusColors = {
  "In stock": "#19CE71",
  "Out of stock": "#F24E1E",
};

export default function Inventory() {
  const [inventoryRows, setInventoryRows] = useState<InventoryRow[]>(
    Array.from({ length: 25 }, (_, i) => ({
      id: uuidv4(),
      item: `Item ${i + 1}`,
      sport: i % 2 === 0 ? "Football" : "Basketball",
      manufacturer: i % 3 === 0 ? "Tops" : i % 3 === 1 ? "Panini" : "Fanatics",
      year: `${2020 + (i % 5)}`,
      price: `$${10 + i}`,
      quantity: `${50 + i * 10}`,
      status: i % 2 === 0 ? "In stock" : "Out of stock",
      dropdownActions: ["Edit Item", "Delete Item"],
    }))
  );

  const [selectedRow, setSelectedRow] = useState<InventoryRow | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(inventoryRows.length / pageSize);

  const paginatedRows = inventoryRows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handleActionClick = (row: InventoryRow, action: string) => {
    setSelectedRow(row);
    if (action === "Edit Item") {
      setEditModalOpen(true);
    } else if (action === "Delete Item") {
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (!selectedRow) return;
    setInventoryRows((prev) =>
      prev.filter((item) => item.id !== selectedRow.id)
    );
    setDeleteModalOpen(false);
    setSelectedRow(null);
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 1500);
  };

  const handleAddItem = (newItem: InventoryItem) => {
    const fullItem: InventoryRow = {
      ...newItem,
      id: uuidv4(),
      dropdownActions: ["Edit Item", "Delete Item"],
    };
    setInventoryRows((prev) => [...prev, fullItem]);
  };

  const calculateTotalValue = () => {
    return inventoryRows.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      const quantity = parseInt(item.quantity, 10);
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminInventoryHeader onAddItem={() => setAddModalOpen(true)} />

      <DataTableCard<InventoryRow>
        columns={inventoryColumns}
        rows={paginatedRows}
        statusColorMap={inventoryStatusColors}
        enableActions
        onActionClick={handleActionClick}
        total={
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] shadow-inner rounded-xl p-4 text-center">
            <h3 className="text-sm text-[#05004E] mb-1 font-semibold">
              Total Inventory Value
            </h3>
            <p className="text-2xl font-bold text-green-600">
              $
              {calculateTotalValue().toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        }
      />

      <EditInventoryItemModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={selectedRow}
        onSuccess={(updatedItem) => {
          setInventoryRows((prev) =>
            prev.map((row) =>
              row.id === updatedItem.id ? { ...row, ...updatedItem } : row
            )
          );
          setEditModalOpen(false);
        }}
      />

      <DeleteInventoryItemModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <AddInventoryItemModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleAddItem}
      />

      <SuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
        message="Item deleted successfully!"
      />

      <DashboardFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDownload={(format) => {
          console.log(`Downloading Inventory as ${format}`);
        }}
      />
    </div>
  );
}
