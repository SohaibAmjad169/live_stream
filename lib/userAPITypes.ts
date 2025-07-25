import mongoose from "mongoose";

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
  users: {};
}
export interface UserRow {
  [key: string]: unknown;
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  joinedOn?: string;
  lastLogin?: string;
  status: "Active" | "In-Active";
  phone?: string;
  address?: string;
  website?: string;
  plan?: string;
  purchaseDate?: string;
  expiryDate?: string;

  dropdownActions?: string[];

  actions?: string;
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
  companyId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Company"; // this must match the name used when exporting the Company model
  };
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

export type FetchUsersParams = {
  page?: number;
  size?: number;
  q?: string;
};

export type FetchUsersResponse = {
  users: ApiUser[];
  total: number;
  page: number;
  size: number;
  totalCount?: number;
};
