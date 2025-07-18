"use client";

import { useState, useEffect, useCallback } from "react"; 
import DataTableCard from "@/components/ui/DataTableCard";
import CompaniesHeader from "@/components/ui/CompaniesHeader";
import CompanyDetailsModal from "@/components/ui/CompanyDetailsModal";
import EditCompanyModal from "@/components/ui/EditCompanyModal";
import CreateCompanyModal from "@/components/ui/CreateCompanyModal";
import InvitationCodeModal from "@/components/ui/InvitationCodeModal";
import DashboardFooter from "@/components/ui/DashboardFooter";
import Cookies from "js-cookie";

export interface CompanyRow {
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
  const [rows, setRows] = useState<CompanyRow[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyRow | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 25; // Display 25 companies per page

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = "http://localhost:3000"; 
 
  const getAuthToken = () => {
    const token = Cookies.get("authToken");
    if (!token) {
      setError("Authentication token not found. Please log in.");
    
      return null;
    }
    return token;
  };

  // --- API Integration Functions ---

  // GET All Companies
  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const authToken = getAuthToken();
    if (!authToken) {
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = `${BASE_URL}/api/super-admin/company`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const fetchedCompanies: CompanyRow[] = data.companies || data; 

      const formattedCompanies = fetchedCompanies.map(company => {
        const apiStatus = (company.isActive === true ? 'active' : 'inactive').toLowerCase(); 
        let displayStatus: "Active" | "In-Active" = "In-Active";
        if (apiStatus === 'active') {
          displayStatus = 'Active';
        } else if (apiStatus === 'inactive') {
          displayStatus = 'In-Active';
        }

        return {
          ...company,
          id: company.id, 
          name: company.name || 'N/A',
          email: company.email || 'N/A',
          lastPurchase: company.lastPurchase || 'N/A',
          plan: company.subscriptionPlan || company.plan || 'N/A', 
          status: displayStatus,
          dropdownActions: ["View details", "Edit Company"], 
        };
      });

      setRows(formattedCompanies);
    } catch (err: any) {
      console.error("Error fetching companies:", err);
      setError(err.message || "Failed to fetch companies.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // POST Create Company
  const createCompany = useCallback(async (newCompanyData: Omit<CompanyRow, 'id' | 'status' | 'lastPurchase' | 'dropdownActions' | 'plan'> & { password: string; confirmPassword: string; subscriptionPlan: string; isActive: boolean; }) => {
    setError(null);
    const authToken = getAuthToken();
    if (!authToken) return false;

    try {
      const apiUrl = `${BASE_URL}/api/super-admin/company`; 
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(newCompanyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      // Assuming success, refetch all companies to update the list
      fetchCompanies();
      return true;
    } catch (err: any) {
      console.error("Error creating company:", err);
      setError(err.message || "Failed to create company.");
      return false; 
  }, [fetchCompanies]);

  // GET Company By Id 
  const fetchCompanyById = useCallback(async (companyId: string) => {
    setError(null);
    const authToken = getAuthToken();
    if (!authToken) return null;

    try {
      const apiUrl = `${BASE_URL}/api/super-admin/company?company_id=${companyId}`; 
      console.log("Fetching company by ID URL:", apiUrl); 
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
  
      const fetchedCompany: CompanyRow = data;

     
      const apiStatus = (fetchedCompany.isActive === true ? 'active' : 'inactive').toLowerCase();
      let displayStatus: "Active" | "In-Active" = "In-Active";
      if (apiStatus === 'active') {
        displayStatus = 'Active';
      } else if (apiStatus === 'inactive') {
        displayStatus = 'In-Active';
      }

      return {
        ...fetchedCompany,
        plan: fetchedCompany.subscriptionPlan || fetchedCompany.plan || 'N/A',
        status: displayStatus,
        dropdownActions: ["View details", "Edit Company"]
      };

    } catch (err: any) {
      console.error("Error fetching company by ID:", err);
      setError(err.message || "Failed to fetch company details.");
      return null;
    }
  }, []);

  // PUT Update Company Details
  const updateCompanyDetails = useCallback(async (companyId: string, updatedData: Partial<CompanyRow>) => {
    setError(null);
    const authToken = getAuthToken();
    if (!authToken) return false;

    try {
      const apiUrl = `${BASE_URL}/api/super-admin/company?company_id=${companyId}`; 
      const payload = {
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
        website: updatedData.website,
        subscriptionPlan: updatedData.plan, 
        purchaseDate: updatedData.purchaseDate,
        expiryDate: updatedData.expiryDate,
        isActive: updatedData.status === 'Active' ? true : false,
      };

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      // Refetch all companies to update the list with the new details
      fetchCompanies();
      return true; 
    } catch (err: any) {
      console.error("Error updating company details:", err);
      setError(err.message || "Failed to update company details.");
      return false; 
    }
  }, [fetchCompanies]);

  // PATCH Update Status
  const updateCompanyStatus = useCallback(async (companyId: string, newStatus: "Active" | "In-Active") => {
    setError(null);
    const authToken = getAuthToken();
    if (!authToken) return false;

    try {
      const apiUrl = `${BASE_URL}/api/super-admin/company/status?company_id=${companyId}`; 
      const payload = {
        isActive: newStatus === "Active" ? true : false, 
      };

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      // Refetch all companies to update the list with the new status
      fetchCompanies();
      return true; 
    } catch (err: any) {
      console.error("Error updating company status:", err);
      setError(err.message || "Failed to update company status.");
      return false; 
    }
  }, [fetchCompanies]);



  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]); 

  // --- Handlers for UI interactions ---
  const handleActionClick = async (row: CompanyRow, action: string) => {
    const companyDetails = await fetchCompanyById(row.id);
    if (companyDetails) {
      setSelectedCompany(companyDetails);
      if (action === "View details") setDetailsOpen(true);
      else if (action === "Edit Company") setEditOpen(true);
    }
  };

  const handleSaveCompany = async (updated: CompanyRow) => {
    // Call the API to update company details
    const success = await updateCompanyDetails(updated.id, updated);
    if (success) {
      setEditOpen(false); 
    
    }
  };

  const handleStatusChange = async (id: string, newStatus: "Active" | "In-Active") => {
    // Call the API to update company status
    const success = await updateCompanyStatus(id, newStatus);
    if (success) {
      setDetailsOpen(false);
     
    }
  };

  const handleCompanyCreate = async (newCompanyData: any) => { 
    // Call the API to create a new company
    const success = await createCompany(newCompanyData);
    if (success) {
      setIsModalOpen(false); 
      setInvitationModalOpen(true); 
    }
  };

  const companyStatusColors = {
    Active: "#19CE71",
    "In-Active": "#F24E1E",
  };

  // Calculate totalPages and paginatedRows based on fetched 'rows'
  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = rows.slice(
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
        Error loading companies: {error}
        <button
          onClick={fetchCompanies}
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
        onSuccess={handleCompanyCreate}
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
        onClose={() => setDetailsOpen(false)}
        company={selectedCompany}
        onStatusChange={handleStatusChange}
      />

      <EditCompanyModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
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
