"use client";

import { useState } from "react";
import DataTableCard from "@/components/ui/DataTableCard";
import CompaniesHeader from "@/components/ui/CompaniesHeader";
import CompanyDetailsModal from "@/components/ui/CompanyDetailsModal";
import EditCompanyModal from "@/components/ui/EditCompanyModal";
import CreateCompanyModal from "@/components/ui/CreateCompanyModal";
import InvitationCodeModal from "@/components/ui/InvitationCodeModal";
import DashboardFooter from "@/components/ui/DashboardFooter";

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
  [key: string]: string | string[] | undefined;
}

const companiesColumns = [
  { label: "Company name", key: "name" },
  { label: "Admin Email", key: "email" },
  { label: "Subscription Plan", key: "plan" },
  { label: "Renewal Date", key: "expiryDate" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

const initialCompanies: CompanyRow[] = [
  {
    id: "1",
    name: "Tech Sales",
    email: "techsales@gmail.com",
    lastPurchase: "12/6/24",
    plan: "Plan A",
    status: "In-Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+9123456789",
    address: "House 15, St 3, Sector A, City ABC",
    website: "www.techsales.com",
    purchaseDate: "27/10/2024",
    expiryDate: "27/11/2024",
  },
  {
    id: "2",
    name: "AB Streamer",
    email: "iamjaisuthar@gmail.com",
    lastPurchase: "12/5/22",
    plan: "Plan B",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+9188888888",
    address: "XYZ Street, City DEF",
    website: "www.abstreamer.com",
    purchaseDate: "15/08/2023",
    expiryDate: "15/08/2024",
  },
  {
    id: "3",
    name: "AVP Studios",
    email: "AVP@gmail.com",
    lastPurchase: "12/5/20",
    plan: "Plan C",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+9199999999",
    address: "123 Park Lane, City XYZ",
    website: "www.avpstudios.com",
    purchaseDate: "01/01/2023",
    expiryDate: "01/01/2024",
  },
  {
    id: "4",
    name: "Streamline Inc",
    email: "streamlineinc@example.com",
    lastPurchase: "20/11/2023",
    plan: "Plan B",
    status: "In-Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+918609867422",
    address: "543 Main Street, City E",
    website: "www.streamlineinc.com",
    purchaseDate: "20/11/2023",
    expiryDate: "19/11/2024",
  },
  {
    id: "5",
    name: "ByteWave",
    email: "bytewave@example.com",
    lastPurchase: "10/06/2023",
    plan: "Plan C",
    status: "In-Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+918592094546",
    address: "241 Main Street, City F",
    website: "www.bytewave.com",
    purchaseDate: "10/06/2023",
    expiryDate: "09/06/2024",
  },
  {
    id: "6",
    name: "Alpha Creators",
    email: "alphacreators@example.com",
    lastPurchase: "06/09/2023",
    plan: "Plan A",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+918652619063",
    address: "371 Main Street, City G",
    website: "www.alphacreators.com",
    purchaseDate: "06/09/2023",
    expiryDate: "05/09/2024",
  },
  {
    id: "7",
    name: "Visionary Media",
    email: "visionarymedia@example.com",
    lastPurchase: "28/04/2023",
    plan: "Plan B",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+918819514024",
    address: "187 Main Street, City H",
    website: "www.visionarymedia.com",
    purchaseDate: "28/04/2023",
    expiryDate: "27/04/2024",
  },
  {
    id: "8",
    name: "ContentSphere",
    email: "contentsphere@example.com",
    lastPurchase: "19/11/2023",
    plan: "Plan C",
    status: "In-Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+917080000503",
    address: "807 Main Street, City I",
    website: "www.contentsphere.com",
    purchaseDate: "19/11/2023",
    expiryDate: "18/11/2024",
  },
  {
    id: "9",
    name: "Quantum Streams",
    email: "quantumstreams@example.com",
    lastPurchase: "01/03/2024",
    plan: "Plan A",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+917654321098",
    address: "999 Quantum St, City J",
    website: "www.quantumstreams.com",
    purchaseDate: "01/03/2024",
    expiryDate: "01/03/2025",
  },
  {
    id: "10",
    name: "Blue Pixel Labs",
    email: "bluepixel@example.com",
    lastPurchase: "11/01/2024",
    plan: "Plan B",
    status: "In-Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+919888887777",
    address: "88 Pixel Lane, City K",
    website: "www.bluepixellabs.com",
    purchaseDate: "11/01/2024",
    expiryDate: "11/01/2025",
  },
  {
    id: "11",
    name: "Skyline Productions",
    email: "skylineprod@example.com",
    lastPurchase: "05/06/2023",
    plan: "Plan C",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+917766554433",
    address: "12 Skyline Dr, City L",
    website: "www.skylineproductions.com",
    purchaseDate: "05/06/2023",
    expiryDate: "05/06/2024",
  },
  {
    id: "12",
    name: "RedLeaf Studios",
    email: "redleaf@example.com",
    lastPurchase: "10/02/2024",
    plan: "Plan A",
    status: "In-Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+916654332211",
    address: "45 Red St, City M",
    website: "www.redleafstudios.com",
    purchaseDate: "10/02/2024",
    expiryDate: "10/02/2025",
  },
  {
    id: "13",
    name: "NovaStream",
    email: "novastream@example.com",
    lastPurchase: "09/08/2023",
    plan: "Plan B",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+918888112233",
    address: "9 Nova Plaza, City N",
    website: "www.novastream.com",
    purchaseDate: "09/08/2023",
    expiryDate: "09/08/2024",
  },
  {
    id: "14",
    name: "NextGen Creators",
    email: "nextgen@example.com",
    lastPurchase: "04/04/2023",
    plan: "Plan C",
    status: "Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+917711223344",
    address: "222 Creator Ave, City O",
    website: "www.nextgencreators.com",
    purchaseDate: "04/04/2023",
    expiryDate: "04/04/2024",
  },
  {
    id: "15",
    name: "UltraVision",
    email: "ultravision@example.com",
    lastPurchase: "29/07/2023",
    plan: "Plan A",
    status: "In-Active",
    dropdownActions: ["View details", "Edit Company"],
    phone: "+919922334455",
    address: "77 Vision Lane, City P",
    website: "www.ultravision.com",
    purchaseDate: "29/07/2023",
    expiryDate: "29/07/2024",
  },
  {
  id: "16",
  name: "Zeta Films",
  email: "zetafilms@example.com",
  lastPurchase: "25/05/2023",
  plan: "Plan B",
  status: "In-Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+917595124577",
  address: "30 Media Ave, City Q",
  website: "www.zetafilms.com",
  purchaseDate: "25/05/2023",
  expiryDate: "24/05/2024",
},
{
  id: "17",
  name: "Echo Studios",
  email: "echostudios@example.com",
  lastPurchase: "20/04/2023",
  plan: "Plan C",
  status: "Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+917504943244",
  address: "265 Media Ave, City R",
  website: "www.echostudios.com",
  purchaseDate: "20/04/2023",
  expiryDate: "19/04/2024",
},
{
  id: "18",
  name: "Nimbus Network",
  email: "nimbusnetwork@example.com",
  lastPurchase: "13/12/2023",
  plan: "Plan A",
  status: "In-Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+917086301413",
  address: "304 Media Ave, City S",
  website: "www.nimbusnetwork.com",
  purchaseDate: "13/12/2023",
  expiryDate: "12/12/2024",
},
{
  id: "19",
  name: "Forge Media",
  email: "forgemedia@example.com",
  lastPurchase: "21/12/2023",
  plan: "Plan B",
  status: "Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+919593215896",
  address: "468 Media Ave, City T",
  website: "www.forgemedia.com",
  purchaseDate: "21/12/2023",
  expiryDate: "20/12/2024",
},
{
  id: "20",
  name: "PixelStorm",
  email: "pixelstorm@example.com",
  lastPurchase: "19/07/2023",
  plan: "Plan C",
  status: "Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+918172240855",
  address: "377 Media Ave, City U",
  website: "www.pixelstorm.com",
  purchaseDate: "19/07/2023",
  expiryDate: "18/07/2024",
},
{
  id: "21",
  name: "CreativeSync",
  email: "creativesync@example.com",
  lastPurchase: "07/06/2023",
  plan: "Plan A",
  status: "In-Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+919877654321",
  address: "151 Media Ave, City V",
  website: "www.creativesync.com",
  purchaseDate: "07/06/2023",
  expiryDate: "06/06/2024",
},
{
  id: "22",
  name: "VisionGrid",
  email: "visiongrid@example.com",
  lastPurchase: "03/08/2023",
  plan: "Plan B",
  status: "Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+917744112233",
  address: "61 Media Ave, City W",
  website: "www.visiongrid.com",
  purchaseDate: "03/08/2023",
  expiryDate: "02/08/2024",
},
{
  id: "23",
  name: "TrackLight",
  email: "tracklight@example.com",
  lastPurchase: "10/03/2023",
  plan: "Plan C",
  status: "In-Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+919911223344",
  address: "98 Media Ave, City X",
  website: "www.tracklight.com",
  purchaseDate: "10/03/2023",
  expiryDate: "09/03/2024",
},
{
  id: "24",
  name: "HiveMinds",
  email: "hiveminds@example.com",
  lastPurchase: "15/01/2024",
  plan: "Plan A",
  status: "Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+916677889900",
  address: "12 Media Ave, City Y",
  website: "www.hiveminds.com",
  purchaseDate: "15/01/2024",
  expiryDate: "15/01/2025",
},
{
  id: "25",
  name: "EpicHue",
  email: "epichue@example.com",
  lastPurchase: "26/11/2023",
  plan: "Plan B",
  status: "In-Active",
  dropdownActions: ["View details", "Edit Company"],
  phone: "+918800556677",
  address: "333 Media Ave, City Z",
  website: "www.epichue.com",
  purchaseDate: "26/11/2023",
  expiryDate: "25/11/2024",
}

];

export default function Companies() {
  const [rows, setRows] = useState<CompanyRow[]>(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState<CompanyRow | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15;
  const totalPages = Math.ceil(rows.length / pageSize);

  const paginatedRows = rows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handleActionClick = (row: CompanyRow, action: string) => {
    setSelectedCompany(row);
    if (action === "View details") setDetailsOpen(true);
    else if (action === "Edit Company") setEditOpen(true);
  };

  const handleSaveCompany = (updated: CompanyRow) => {
    setRows((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
    );
    setSelectedCompany((prev) => (prev?.id === updated.id ? { ...updated } : prev));
  };

  const handleStatusChange = (id: string, newStatus: "Active" | "In-Active") => {
    setRows((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setSelectedCompany((prev) =>
      prev?.id === id ? { ...prev, status: newStatus } : prev
    );
  };

  const handleCompanyCreate = () => {
    setIsModalOpen(false);
    setInvitationModalOpen(true);
  };

  const companyStatusColors = {
    Active: "#19CE71",
    "In-Active": "#F24E1E",
  };

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
