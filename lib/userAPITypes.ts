export const BASE_URL = "http://localhost:3000";

export interface ApiUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  company?: { _id: string; name: string };
  joinedOn: string;
  isActive: boolean;
  lastLogin: string;
  phone?: string;
  address?: string;
  website?: string;
  subscriptionPlan?: string;
  purchaseDate?: string;
  expiryDate?: string;
}

export interface UserRow {
  [key: string]: unknown;
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  joinedOn: string;
  lastLogin: string;
  status: "Active" | "In-Active";
  phone?: string;
  address?: string;
  website?: string;
  plan?: string;
  purchaseDate?: string;
  expiryDate?: string;
  dropdownActions?: string[];
}

export interface AddUserPayload {
  name: string;
  email: string;
  password?: string;
  companyId: string;
  role: string;
  phone?: string;
  address?: string;
  website?: string;
  subscriptionPlan?: string;
  purchaseDate?: string;
  expiryDate?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  companyId?: string;
  role?: string;
  phone?: string;
  address?: string;
  website?: string;
  subscriptionPlan?: string;
  purchaseDate?: string;
  expiryDate?: string;
  isActive?: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  users?: ApiUser[];
  totalCount?: number;
}

export interface Company {
  _id: string;
  name: string;
}

export interface CompaniesApiResponse {
  success: boolean;
  message: string;
  companies: Company[];
}
export interface DashboardStats {
  totalRevenueTracked: number;
  activeCompanies: number;
  activeUsers: number;
  subscriptionRevenue: number;
}

export interface DashboardChartData {
  name: string;
  [key: string]: number | string; // e.g., "Jan", "Plan A": 250
}

export interface TopCompany {
  _id: string;
  name: string;
  revenue: number;
}

export interface DashboardApiResponse {
  success: boolean;
  message: string;
  stats: DashboardStats;
  revenueChartData: DashboardChartData[];
  topCompanies: TopCompany[];
}
