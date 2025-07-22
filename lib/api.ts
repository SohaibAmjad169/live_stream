import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const getAuthToken = (): string | null => {
  const token = Cookies.get("authToken");
  return token || null;
};

export const handleApiError = async (response: Response) => {
  const errorData = await response.json();
  throw new Error(
    errorData.message || `API Error: ${response.status} ${response.statusText}`
  );
};

export const fetchAllCompaniesApi = async (): Promise<any> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const apiUrl = `${BASE_URL}/api/super-admin/company`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }
  return response.json();
};

export const createCompanyApi = async (newCompanyData: any): Promise<any> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const apiUrl = `${BASE_URL}/api/super-admin/company`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(newCompanyData),
  });

  if (!response.ok) {
    await handleApiError(response);
  }
  return response.json();
};

export const fetchCompanyByIdApi = async (companyId: string): Promise<any> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const apiUrl = `${BASE_URL}/api/super-admin/company?company_id=${companyId}`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    await handleApiError(response);
  }
  return response.json();
};

export const updateCompanyDetailsApi = async (
  companyId: string,
  updatedData: Partial<any>
): Promise<any> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const apiUrl = `${BASE_URL}/api/super-admin/company?company_id=${companyId}`;
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    await handleApiError(response);
  }
  return response.json();
};

export const updateCompanyStatusApi = async (
  companyId: string,
  isActive: boolean
): Promise<any> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const apiUrl = `${BASE_URL}/api/super-admin/company/status?company_id=${companyId}`;
  const response = await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    await handleApiError(response);
  }
  return response.json();
};

export const getConfig = async (): Promise<any> => {
  const authToken = getAuthToken();
  console.log("Auth token:", authToken);
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const apiUrl = `${BASE_URL}/api/super-admin/system-config`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API error response:", errorText);
    await handleApiError(response);
  }

  return response.json();
};

export const updateConfig = async (configData: any): Promise<any> => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const apiUrl = `${BASE_URL}/api/super-admin/system-config`;

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(configData),
    redirect: "follow",
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  return response.json();
};

// get Dashboard Data without auth token

export const getDashboardData = async (): Promise<any> => {
  const apiUrl = `${BASE_URL}/api/super-admin/dashboard`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ API Error Response:", errorText);
    await handleApiError(response);
  }

  return response.json();
};
