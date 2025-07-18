"use client";

import { useState } from "react";
import { X } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import Select from "./Select";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCompanyModal({ isOpen, onClose, onSuccess }: CreateCompanyModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [plan, setPlan] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const payload = {
      companyName,
      email,
      phone,
      address,
      website,
      plan,
      password,
      confirmPassword,
    };
    console.log("Submitting company:", payload);
    onClose();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 sm:p-8 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#FF3B30] hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center"
        >
          <X size={16} />
        </button>

        <h2 className="text-[#0B0B58] text-2xl font-bold mb-6 text-center">
          Add New Company
        </h2>

        <p className="text-[#0B0B58] font-semibold mb-2">General Info</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <TextInput label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput label="Phone Num" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextInput label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <TextInput label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <p className="text-[#0B0B58] font-semibold mb-2">Other Details</p>
        <div className="flex gap-3 items-center mb-6">
          <Select
            label="Select Plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            options={[
              { label: "Plan A", value: "Plan A" },
              { label: "Plan B", value: "Plan B" },
              { label: "Plan C", value: "Plan C" },
            ]}
          />
          <TextInput
            label="Create Password"
            type="password"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Type here"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#1E3A8A] hover:bg-[#162d6c] text-white font-semibold py-3 rounded-lg transition-all"
        >
          Generate Code
        </button>
      </div>
    </div>
  );
}
