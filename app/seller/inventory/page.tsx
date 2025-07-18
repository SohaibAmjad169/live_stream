"use client";

import SellerInventoryHeader from "@/components/ui/SellerInventoryHeader";
import DataTableCard from "@/components/ui/DataTableCard";
import SellerFooter from "@/components/ui/SellerFooter";
import { useState } from "react";

const inventoryColumns = [
  { label: "Item", key: "item" },
  { label: "Sport Category", key: "sport" },
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Year", key: "year" },
  { label: "Price", key: "price" },
  { label: "Quantity", key: "quantity" },
  { label: "Status", key: "status" },
];

const inventoryRows = [
  {
    item: "Football Hobby Box",
    sport: "Football",
    manufacturer: "Tops",
    year: "2024",
    price: "$25",
    quantity: "120",
    status: "In stock",
  },
  {
    item: "Basketball Box",
    sport: "Basketball",
    manufacturer: "Panini",
    year: "2023",
    price: "$30",
    quantity: "80",
    status: "Out of stock",
  },
  {
    item: "Baseball Box",
    sport: "Baseball",
    manufacturer: "Topps",
    year: "2022",
    price: "$20",
    quantity: "50",
    status: "In stock",
  },
  {
    item: "Soccer Box",
    sport: "Soccer",
    manufacturer: "Upper Deck",
    year: "2021",
    price: "$22",
    quantity: "90",
    status: "Out of stock",
  },
  {
    item: "Cricket Cards",
    sport: "Cricket",
    manufacturer: "Fanatics",
    year: "2020",
    price: "$18",
    quantity: "40",
    status: "In stock",
  },
  {
    item: "Wrestling Cards",
    sport: "Wrestling",
    manufacturer: "Leaf",
    year: "2023",
    price: "$28",
    quantity: "30",
    status: "In stock",
  },
  {
    item: "Hockey Cards",
    sport: "Hockey",
    manufacturer: "Topps",
    year: "2022",
    price: "$24",
    quantity: "110",
    status: "Out of stock",
  },
  {
    item: "Vintage Football Pack",
    sport: "Football",
    manufacturer: "Tops",
    year: "1999",
    price: "$35",
    quantity: "15",
    status: "In stock",
  },
  {
    item: "NBA Premium Cards",
    sport: "Basketball",
    manufacturer: "Panini",
    year: "2021",
    price: "$40",
    quantity: "25",
    status: "Out of stock",
  },
  {
    item: "World Cup Special",
    sport: "Soccer",
    manufacturer: "Upper Deck",
    year: "2022",
    price: "$45",
    quantity: "65",
    status: "In stock",
  },
  {
    item: "All-Star Baseball Set",
    sport: "Baseball",
    manufacturer: "Topps",
    year: "2023",
    price: "$29",
    quantity: "70",
    status: "In stock",
  },
  {
    item: "Rare Wrestling Memorabilia",
    sport: "Wrestling",
    manufacturer: "Leaf",
    year: "2021",
    price: "$55",
    quantity: "20",
    status: "Out of stock",
  },
  {
    item: "Legends Cricket Box",
    sport: "Cricket",
    manufacturer: "Fanatics",
    year: "2022",
    price: "$38",
    quantity: "50",
    status: "In stock",
  },
  {
    item: "Limited Hockey Cards",
    sport: "Hockey",
    manufacturer: "Topps",
    year: "2023",
    price: "$42",
    quantity: "33",
    status: "Out of stock",
  },
  {
    item: "NFL Rookie Cards",
    sport: "Football",
    manufacturer: "Tops",
    year: "2021",
    price: "$26",
    quantity: "95",
    status: "In stock",
  },
  {
    item: "Panini Select NBA",
    sport: "Basketball",
    manufacturer: "Panini",
    year: "2023",
    price: "$36",
    quantity: "40",
    status: "Out of stock",
  },
  {
    item: "Hall of Fame Baseball",
    sport: "Baseball",
    manufacturer: "Topps",
    year: "2024",
    price: "$32",
    quantity: "75",
    status: "In stock",
  },
  {
    item: "World Cup Cricket Pack",
    sport: "Cricket",
    manufacturer: "Fanatics",
    year: "2020",
    price: "$21",
    quantity: "44",
    status: "In stock",
  },
  {
    item: "Legends of Hockey",
    sport: "Hockey",
    manufacturer: "Topps",
    year: "2022",
    price: "$23",
    quantity: "78",
    status: "Out of stock",
  },
  {
    item: "Retro Football Box",
    sport: "Football",
    manufacturer: "Tops",
    year: "2010",
    price: "$20",
    quantity: "60",
    status: "In stock",
  },
  {
    item: "Classic NBA Series",
    sport: "Basketball",
    manufacturer: "Panini",
    year: "2015",
    price: "$19",
    quantity: "35",
    status: "Out of stock",
  },
  {
    item: "Super Hit Cricket Cards",
    sport: "Cricket",
    manufacturer: "Fanatics",
    year: "2021",
    price: "$27",
    quantity: "47",
    status: "In stock",
  },
  {
    item: "WrestleMania Pack",
    sport: "Wrestling",
    manufacturer: "Leaf",
    year: "2020",
    price: "$33",
    quantity: "29",
    status: "Out of stock",
  },
  {
    item: "Premier League Soccer",
    sport: "Soccer",
    manufacturer: "Upper Deck",
    year: "2023",
    price: "$46",
    quantity: "54",
    status: "In stock",
  },
  {
    item: "Hockey Ice Edition",
    sport: "Hockey",
    manufacturer: "Topps",
    year: "2019",
    price: "$22",
    quantity: "38",
    status: "In stock",
  },
  {
    item: "Cricket Classic Edition",
    sport: "Cricket",
    manufacturer: "Fanatics",
    year: "2022",
    price: "$19",
    quantity: "66",
    status: "Out of stock",
  },
  {
    item: "All-Time Football Greats",
    sport: "Football",
    manufacturer: "Tops",
    year: "2024",
    price: "$34",
    quantity: "81",
    status: "In stock",
  },
  {
    item: "NBA Young Stars",
    sport: "Basketball",
    manufacturer: "Panini",
    year: "2023",
    price: "$37",
    quantity: "53",
    status: "Out of stock",
  },
  {
    item: "MLB Fan Pack",
    sport: "Baseball",
    manufacturer: "Topps",
    year: "2023",
    price: "$31",
    quantity: "90",
    status: "In stock",
  },
  {
    item: "World Soccer Superstars",
    sport: "Soccer",
    manufacturer: "Upper Deck",
    year: "2023",
    price: "$39",
    quantity: "72",
    status: "In stock",
  },
];

const inventoryStatusColors = {
  "In stock": "#19CE71",
  "Out of stock": "#F24E1E",
};

export default function Inventory() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(inventoryRows.length / pageSize);

  const paginatedRows = inventoryRows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div className="flex flex-col gap-6">
      <SellerInventoryHeader />
      <DataTableCard
        columns={inventoryColumns}
        rows={paginatedRows}
        statusColorMap={inventoryStatusColors}
        striped
      />
      <SellerFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
