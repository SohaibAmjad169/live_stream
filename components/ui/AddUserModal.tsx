"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import { UserRow } from "@/app/superadmin/user-management/page";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newUser: UserRow) => void; // ✅ Strongly typed, no ESLint error
}

type UserFormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  password: string;
  plan?: string;
  purchaseDate?: string;
  expiryDate?: string;
};


export default function AddUserModal({ isOpen, onClose, onAdd }: Props) {
const [form, setForm] = useState<UserFormData>({
  name: "",
  email: "",
  company: "",
  role: "Seller",
  password: "",
  plan: "",
  purchaseDate: "",
  expiryDate: "",
});


  const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (field: keyof UserFormData, value: string) => {
  setForm((prev) => ({ ...prev, [field]: value }));
  setErrors((prev) => ({ ...prev, [field]: "" }));
};

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.company) newErrors.company = "Company is required.";
    if (!form.password || form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser: UserRow = {
      ...form,
      id: Date.now().toString(),
      joinedOn: new Date().toLocaleDateString(),
      lastLogin: "-",
      status: "Active",
      dropdownActions: ["View details", "Edit Details", "Reset Password", "Deactivate"],
      name: "",
      company: "",
      role: "",
      email: ""
    };

    onAdd(newUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl max-h-[95vh] rounded-2xl shadow-xl relative flex flex-col my-6 sm:my-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#FF3B30] hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center z-10"
        >
          <X size={16} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-4 sm:px-8 py-4">
          <h2 className="text-[#0B0B58] text-lg font-bold mb-6">Add User</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
            <div className="flex flex-col">
              <TextInput
                label="Name"
                placeholder="Enter name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
            </div>

            <div className="flex flex-col">
              <TextInput
                label="Email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
            </div>

            <div className="flex flex-col">
              <TextInput
                label="Company"
                placeholder="Enter company"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
              {errors.company && <span className="text-red-500 text-xs mt-1">{errors.company}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="relative">
                <select
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="appearance-none cursor-pointer w-full border border-[#C3D3E2] bg-[#F9FAFB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Seller">Seller</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
                <ChevronDown className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col">
              <TextInput
                label="Password"
                placeholder="Enter password"
                type="password"
                value={form.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
            </div>

            <div className="flex flex-col">
              <TextInput
                label="Plan"
                placeholder="Plan details (optional)"
                value={form.plan || ""}
                onChange={(e) => handleChange("plan", e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
              <input
                type="date"
                value={form.purchaseDate || ""}
                onChange={(e) => handleChange("purchaseDate", e.target.value)}
                className="w-full border border-[#C3D3E2] bg-[#F9FAFB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="date"
                value={form.expiryDate || ""}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
                className="w-full border border-[#C3D3E2] bg-[#F9FAFB] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center pt-2 pb-4">
            <button
              onClick={handleSubmit}
              className="bg-[#1E3A8A] text-white font-semibold px-6 py-2 rounded-lg"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
