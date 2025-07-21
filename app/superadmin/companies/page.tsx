"use client";

import { useState, useEffect } from "react";
import DataTableCard from "@/components/ui/DataTableCard";
import CompaniesHeader from "@/components/ui/CompaniesHeader";
import CompanyDetailsModal from "@/components/ui/CompanyDetailsModal";
import EditCompanyModal from "@/components/ui/EditCompanyModal";
import CreateCompanyModal from "@/components/ui/CreateCompanyModal";
import InvitationCodeModal from "@/components/ui/InvitationCodeModal";
import DashboardFooter from "@/components/ui/DashboardFooter";


import { useCompanies } from "../../../hooks/companies/useCompanies"; 
import { useCompanyById } from "../../../hooks/companies/useCompanyById"; 
import { useCreateCompany } from "../../../hooks/companies/useCreateCompany"; 
import { useUpdateCompanyDetails } from "../../../hooks/companies/useUpdateCompany"; 
import { useUpdateCompanyStatus } from "../../../hooks/companies/useUpdateCompanyStatus"; 


export interface CompanyRow {
  [key: string]: unknown;
  id: string;
  name: string;
  email: string;
  lastPurchase: string;
  plan: string;
  status: "Active" | "In-Active";
  dropdownActions?: string[];
  phone?: string;
  address?: string;
  website?: string;
  purchaseDate?: string;
  expiryDate?: string;
  subscriptionPlan?: string;
  isActive?: boolean;
  password?: string;
  confirmPassword?: string;
}

const companiesColumns = [
  { label: "Company name", key: "name" },
  { label: "Admin Email", key: "email" },
  { label: "Subscription Plan", "key": "plan" },
  { label: "Renewal Date", key: "expiryDate" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

export default function Companies() {

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null); 
  const [selectedCompany, setSelectedCompany] = useState<CompanyRow | null>(null);
  
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 25; 

  
  const { data: companies, isLoading, error } = useCompanies(); 
  const { 
    data: companyDetails, 
    isLoading: isLoadingCompanyDetails, 
    error: companyDetailsError 
  } = useCompanyById(selectedCompanyId); 

  const { mutate: createCompanyMutation, isPending: isCreatingCompany } = useCreateCompany();
  const { mutate: updateCompanyDetailsMutation, isPending: isUpdatingDetails } = useUpdateCompanyDetails();
  const { mutate: updateCompanyStatusMutation, isPending: isUpdatingStatus } = useUpdateCompanyStatus();

  
  useEffect(() => {
    if (companyDetails) {
      setSelectedCompany(companyDetails);
    }
  }, [companyDetails]);



  const handleActionClick = async (row: CompanyRow, action: string) => {
    setSelectedCompanyId(row.id); 
    if (action === "View details") setDetailsOpen(true);
    else if (action === "Edit Company") setEditOpen(true);
  };

  const handleSaveCompany = async (updated: CompanyRow) => {
    const payload = {
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        address: updated.address,
        website: updated.website,
        subscriptionPlan: updated.plan, 
        purchaseDate: updated.purchaseDate,
        expiryDate: updated.expiryDate,
        isActive: updated.status === 'Active' ? true : false,
    };

    updateCompanyDetailsMutation({ companyId: updated.id, updatedData: payload }, {
      onSuccess: () => {
        setEditOpen(false);
        setSelectedCompanyId(null); 
      },
      onError: (err: { message: string }) => {
        console.error("Error saving company:", err.message);
      }
    });
  };

  const handleStatusChange = async (id: string, newStatus: "Active" | "In-Active") => {
    updateCompanyStatusMutation({ companyId: id, newStatus }, {
      onSuccess: () => {
        setDetailsOpen(false);
        setSelectedCompanyId(null); 
      },
      onError: (err) => {
        console.error("Error changing status:", err.message);
      }
    });
  };

  const handleCompanyCreate = async (newCompanyData: any) => {
    createCompanyMutation(newCompanyData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setInvitationModalOpen(true);
      },
      onError: (err) => {
        console.error("Error creating company:", err.message);
      }
    });
  };

  const companyStatusColors = {
    Active: "#19CE71",
    "In-Active": "#F24E1E",
  };

  const effectiveCompanies = companies || [];
  const totalPages = Math.ceil(effectiveCompanies.length / pageSize);
  const paginatedRows = effectiveCompanies.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading companies...
      </div>
    );
  }

  if (error) { 
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600 text-lg font-semibold">
        Error loading companies: {error.message}
        <button
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <CompaniesHeader onAddCompanyClick={() => setIsModalOpen(true)} />

      <CreateCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          setInvitationModalOpen(true);
        }}
      />

      <InvitationCodeModal
        isOpen={invitationModalOpen}
        onClose={() => setInvitationModalOpen(false)}
        link="https://your-invite-link.com/abc123"
      />

      <DataTableCard<CompanyRow>
        columns={companiesColumns}
        rows={paginatedRows}
        statusColorMap={companyStatusColors}
        enableActions
        onActionClick={handleActionClick}
      />

      <CompanyDetailsModal
        isOpen={detailsOpen}
        onClose={() => {setDetailsOpen(false); setSelectedCompanyId(null);}} 
        company={selectedCompany} 
        onStatusChange={handleStatusChange}
      />

      <EditCompanyModal
        isOpen={editOpen}
        onClose={() => {setEditOpen(false); setSelectedCompanyId(null);}} 
        company={selectedCompany} 
        onSave={handleSaveCompany}
      />

      <DashboardFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}