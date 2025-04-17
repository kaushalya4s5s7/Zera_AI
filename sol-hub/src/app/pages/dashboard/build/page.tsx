"use client";
import { ActivitySquare, BarChart3, ShieldCheck, Trophy } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import StatCard from "@/components/dashboard/dashui/StatCard";
import LineChart from "@/components/dashboard/dashui/LineChart";
import BarChart from "@/components/dashboard/dashui/BarChart";
import CircularChart from "@/components/dashboard/dashui/CircularChart";
import CalendarWidget from "@/components/dashboard/dashui/CalendaerWidget";
import { useEffect, useState } from "react";
// import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";
import useAuditStore from "@/store/auditStore"; // Import the Zustand store

const Dashboard = () => {
  const { isConnected, address } = useWallet();
  // const { getWalletProfile, isSupabaseConfigured } = useSupabase();
  const [ setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Add this (import from 'next/navigation')

  const { auditScore } = useAuditStore();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
      return;
    }

    // // Fetch user profile from Supabase if wallet is connected
    // const fetchProfile = async () => {
    //   if (address && isSupabaseConfigured) {
    //     setLoading(true);
    //     try {
    //       const { data, success } = await getWalletProfile(address);
    //       if (success && data) {
    //         setProfile(data);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching wallet profile:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    // };

    // fetchProfile();
  }, [isConnected, router, address]); // Update

  if (!isConnected) {
    return null;
  }
  // Sample data for circular charts
  const deploymentData = [
    { name: "Ethereum", value: 45, color: "#8B5CF6" },
    { name: "Polygon", value: 30, color: "#4ADE80" },
    { name: "Arbitrum", value: 15, color: "#FF6D00" },
    { name: "Others", value: 10, color: "#00B8D9" },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Audit Score"
          value={Number(auditScore) || 0}
          icon={<ShieldCheck className="w-5 h-5" />}
          trend={{ value: 4.2, isPositive: true }}
          colorClass="bg-green/80"
        />
        <StatCard
          title="Total Contracts"
          value={Number(1)}
          icon={<ActivitySquare className="w-5 h-5 " />}
          trend={{ value: 12, isPositive: true }}
          colorClass="bg-green/80"
        />
        <StatCard
          title="Audits Completed"
          value={Number(1)}
          icon={<BarChart3 className="w-5 h-5" />}
          trend={{ value: 8, isPositive: true }}
          colorClass="bg-orange/80"
        />
        <StatCard
          title="Security Rating"
          value={Number(4)}
          icon={<Trophy className="w-5 h-5" />}
          colorClass="bg-yellow/80"
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
