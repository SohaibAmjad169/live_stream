import { useQuery } from "@tanstack/react-query";
import { fetchCompanyByIdApi } from "@/lib/api"; 
import { CompanyRow } from "@/app/superadmin/companies/page"; 


const formatSingleCompanyData = (data: any): CompanyRow => {
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
};

export const useCompanyById = (companyId: string | null) => {
  return useQuery<CompanyRow, Error>({
    queryKey: ["company", companyId], 
    queryFn: async () => {
      if (!companyId) throw new Error("Company ID is required.");
      const data = await fetchCompanyByIdApi(companyId);
      return formatSingleCompanyData(data);
    },
    enabled: !!companyId, 
    staleTime: 1000 * 60 * 5,
  });
};