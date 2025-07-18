import PerformanceSummary from "@/components/ui/PerformanceSummary";
import OverviewLineChart from "@/components/ui/OverviewLineChart";
// import SystemUsageChart from "@/components/ui/SystemUsageChart";
// import SubscriptionsBarChart from "@/components/ui/SubscriptionsBarChart";
import TopCompaniesTable from "@/components/ui/TopCompaniesTable";

const stats = [
  {
    bg: "#FFE2E5", // light pink
    iconBg: "#FA5A7D", // red/pink icon background
    icon: "/revenue.svg",
    amount: "$100k",
    label: "Total Revenue Tracked",
    change: "+8%",
    changeColor: "#FA5A7D",
  },
  {
    bg: "#E2F0FF", // light blue
    iconBg: "#3B82F6", // blue icon background
    icon: "/active-companies.svg",
    amount: "79",
    label: "Active Companies",
    change: "+5%",
    changeColor: "#3B82F6",
  },
  {
    bg: "#DCFCE7", // light green
    iconBg: "#22C55E", // green icon background
    icon: "/user-management-active.svg",
    amount: "700",
    label: "Active Users",
    change: "+12%",
    changeColor: "#22C55E",
  },
  {
    bg: "#FDF6B2", // light yellow
    iconBg: "#FBBF24", // yellow icon background
    icon: "/subscription-revenue.svg", // <-- Replace with actual icon
    amount: "$45k",
    label: "Subscription Revenue",
    change: "+15%",
    changeColor: "#FBBF24",
  },
];

export default function SellerDashboard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-[#05004E] text-3xl xl:text-4xl font-semibold">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex-5">
          <div className="h-full min-h-[240px]">
            <PerformanceSummary
              title="Overall Performance"
              subtitle="Summary of this month"
              stats={stats}
            />
          </div>
        </div>
        <div className="flex-4">
          <div className="h-full min-h-[240px]">
            <OverviewLineChart
              title="Revenue Subscription Plan Breakdown"
              filterLabel="This year"
              data={[
                { name: "Jan", "Plan A": 250, "Plan B": 180, "Plan C": 300 },
                { name: "Feb", "Plan A": 240, "Plan B": 190, "Plan C": 310 },
                { name: "Mar", "Plan A": 230, "Plan B": 200, "Plan C": 290 },
                { name: "Apr", "Plan A": 210, "Plan B": 160, "Plan C": 280 },
                { name: "May", "Plan A": 200, "Plan B": 150, "Plan C": 270 },
                { name: "Jun", "Plan A": 230, "Plan B": 200, "Plan C": 300 },
                { name: "Jul", "Plan A": 300, "Plan B": 400, "Plan C": 320 },
                { name: "Aug", "Plan A": 290, "Plan B": 360, "Plan C": 310 },
                { name: "Sep", "Plan A": 270, "Plan B": 330, "Plan C": 290 },
                { name: "Oct", "Plan A": 250, "Plan B": 300, "Plan C": 270 },
                { name: "Nov", "Plan A": 230, "Plan B": 270, "Plan C": 250 },
                { name: "Dec", "Plan A": 210, "Plan B": 240, "Plan C": 230 },
              ]}
              lines={[
                { dataKey: "Plan A", stroke: "#8B5CF6", label: "Plan A" },
                {
                  dataKey: "Plan B",
                  stroke: "#EF4444",
                  label: "Plan B",
                  showDot: true,
                },
                { dataKey: "Plan C", stroke: "#22C55E", label: "Plan C" },
              ]}
              highlightDot={{
                xValue: "Jul",
                dataKey: "Plan B",
                value: 400,
                color: "#EF4444",
              }}
              yDomain={[0, 500]}
              yTicks={[0, 100, 200, 300, 400, 500]}
            />
          </div>
        </div>
      </div>
      <TopCompaniesTable />
    </div>
  );
}
