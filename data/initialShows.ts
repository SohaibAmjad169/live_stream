import { ShowRow } from "@/app/seller/dashboard/page";
import { v4 as uuidv4 } from "uuid";

export const initialShows: ShowRow[] = [
  {
    id: uuidv4(),
    date: "2025-12-01",
    platform: "TIKTOK",
    item: "Football Hobby Box",
    price: "$25",
    commission: "$5",
    status: "Completed",
    dropdownActions: ["View Show"],
  },
  {
    id: uuidv4(),
    date: "2025-12-01",
    platform: "TIKTOK",
    item: "Shirt",
    price: "$15",
    commission: "$2",
    status: "On Review",
    dropdownActions: ["Edit Show", "Delete Show"],
  },
  {
    id: uuidv4(),
    date: "2025-12-03",
    platform: "WHATNOT",
    item: "Sneakers",
    price: "$120",
    commission: "$18",
    status: "In Queue",
    dropdownActions: ["Edit Show", "Delete Show"],
  },
  {
    id: uuidv4(),
    date: "2025-11-28",
    platform: "INSTAGRAM",
    item: "Headphones",
    price: "$45",
    commission: "$6",
    status: "Completed",
    dropdownActions: ["View Show"],
  },
  {
    id: uuidv4(),
    date: "2025-12-05",
    platform: "TIKTOK",
    item: "Gaming Mouse",
    price: "$60",
    commission: "$9",
    status: "On Review",
    dropdownActions: ["Edit Show", "Delete Show"],
  },
  {
    id: uuidv4(),
    date: "2025-12-06",
    platform: "WHATNOT",
    item: "Smartwatch",
    price: "$75",
    commission: "$10",
    status: "Completed",
    dropdownActions: ["View Show"],
  },
  {
    id: uuidv4(),
    date: "2025-12-07",
    platform: "INSTAGRAM",
    item: "Backpack",
    price: "$35",
    commission: "$5",
    status: "In Queue",
    dropdownActions: ["Edit Show", "Delete Show"],
  },
];
