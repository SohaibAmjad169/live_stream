export interface Employee {
  id: string;
  name: string;
  paymentType: string;
  role: string;
  rate: string;
  status: "Active" | "Inactive";
  dropdownActions?: string[];
  [key: string]: string | string[] | undefined; // ✅ Add this to make it indexable
}
