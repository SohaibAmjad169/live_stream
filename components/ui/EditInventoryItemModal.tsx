"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import Select from "@/components/ui/SelectDropdown";
import SuccessModal from "./SuccessModal";

interface InventoryItem {
  id: string;
  item: string;
  sport: string;
  manufacturer: string;
  year: string;
  price: string;
  quantity: string;
}

interface EditInventoryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedItem: InventoryItem) => void;
  item: InventoryItem | null;
}

export default function EditInventoryItemModal({
  isOpen,
  onClose,
  onSuccess,
  item,
}: EditInventoryItemModalProps) {
  const [form, setForm] = useState({
    id: "",
    item: "",
    sport: "",
    manufacturer: "",
    year: "",
    price: "",
    quantity: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (item) {
      setForm(item);
    }
  }, [item]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSuccess({ ...form });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  if (!isOpen || !item) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl p-6 sm:p-8 relative shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-[#FF3B30] hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center"
          >
            <X size={16} />
          </button>

          <div className="flex flex-col justify-center mb-6">
            <h2 className="text-[#05004E] text-2xl font-bold">Edit item details</h2>
            <p className="text-sm text-[#737791] mt-1">Last updated: 12/2/2024</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <TextInput
              label="Item Name"
              value={form.item}
              onChange={(e) => handleChange("item", e.target.value)}
            />
            <Select
              label="Category"
              selected={form.sport}
              onChange={(val) => handleChange("sport", val)}
              options={["Football", "Basketball", "Baseball"]}
            />
            <Select
              label="Manufacturer"
              selected={form.manufacturer}
              onChange={(val) => handleChange("manufacturer", val)}
              options={["Tops", "Panini", "Fanatics"]}
            />
            <TextInput
              label="Mfg Year"
              value={form.year}
              onChange={(e) => handleChange("year", e.target.value)}
            />
            <TextInput
              label="Price"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <TextInput
              label="Stock Available"
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-[#1E3A8A] hover:bg-[#162d6c] text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Item details updated successfully!"
      />
    </>
  );
}
