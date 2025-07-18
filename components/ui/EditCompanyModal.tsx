"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import SuccessModal from "./SuccessModal";
import { CompanyRow } from "@/app/superadmin/companies/page";

interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyRow | null;
  onSave: (updated: CompanyRow) => void;
}

export default function EditCompanyModal({
  isOpen,
  onClose,
  company,
  onSave,
}: EditCompanyModalProps) {
  const [formData, setFormData] = useState<CompanyRow>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    lastPurchase: "",
    plan: "",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    purchaseDate: "",
    expiryDate: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (company) setFormData(company);
  }, [company]);

  const handleChange = (field: keyof CompanyRow, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen || !company) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-3xl rounded-2xl p-6 sm:p-8 relative shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-[#FF3B30] hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center"
          >
            <X size={16} />
          </button>

          <h2 className="text-[#0B0B58] text-lg font-bold mb-6">
            Edit Company&apos;s Info
          </h2>

          <p className="text-[#0B0B58] font-semibold mb-2">General Info</p>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
  <TextInput
    label="Company Name"
    value={formData.name}
    onChange={(e) => handleChange("name", e.target.value)}
  />
  <TextInput
    label="Admin Email"
    type="email"
    value={formData.email}
    onChange={(e) => handleChange("email", e.target.value)}
  />
  <TextInput
    label="Subscription Plan"
    value={formData.plan}
    onChange={(e) => handleChange("plan", e.target.value)}
  />
  <TextInput
    label="Renewal Date"
    type="date"
    value={formData.expiryDate ?? ""}
    onChange={(e) => handleChange("expiryDate", e.target.value)}
  />
  <TextInput
    label="Status"
    value={formData.status}
    onChange={(e) =>
      handleChange("status", e.target.value as "Active" | "In-Active")
    }
  />
</div>


          <div className="flex justify-center pt-2">
            <button
              onClick={handleSubmit}
              className="bg-[#1E3A8A] text-white font-semibold px-6 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Company info updated successfully!"
      />
    </>
  );
}
