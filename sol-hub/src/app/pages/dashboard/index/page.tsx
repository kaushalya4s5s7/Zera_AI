'use client';
import { ActivitySquare, BarChart3, ShieldCheck, Trophy } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import StatCard from "@/components/dashboard/dashui/StatCard";
import LineChart from "@/components/dashboard/dashui/LineChart";
import BarChart from "@/components/dashboard/dashui/BarChart";
import CircularChart from "@/components/dashboard/dashui/CircularChart";
import CalendarWidget from "@/components/dashboard/dashui/CalendaerWidget";
import useAuditStore from "@/store/auditStore"; // Import the Zustand store

const Dashboard = () => {
  // Sample data for circular charts
  const deploymentData = [
    { name: "Ethereum", value: 45, color: "#8B5CF6" },
    { name: "Polygon", value: 30, color: "#4ADE80" },
    { name: "Arbitrum", value: 15, color: "#FF6D00" },
    { name: "Others", value: 10, color: "#00B8D9" },
  ];

  const {  auditScore} = useAuditStore();

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Audit Score"
          value={Number(auditScore) || 0}
          icon={<ShieldCheck className="w-5 h-5" />}
          trend={{ value: 4.2, isPositive: true }}
          colorClass="bg-primary"
        />
        <StatCard
          title="Total Contracts"
          value={Number(32)}
          icon={<ActivitySquare className="w-5 h-5" />}
          trend={{ value: 12, isPositive: true }}
          colorClass="bg-secondary"
        />
        <StatCard
          title="Audits Completed"
          value={Number(32)}
          icon={<BarChart3 className="w-5 h-5" />}
          trend={{ value: 8, isPositive: true }}
          colorClass="bg-orange/80"
        />
        <StatCard
          title="Security Rating"
          value={Number(32)}
          icon={<Trophy className="w-5 h-5" />}
          colorClass="bg-cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <LineChart className="lg:col-span-2" />
        <CircularChart title="Contract Deployments" data={deploymentData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarChart className="lg:col-span-2" />
        <CalendarWidget />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
