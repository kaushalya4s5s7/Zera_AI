"use client";

import { Shield, Star, Layers } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import WalletInfo from "@/components/dashboard/profile/WalletInfo";
import ProfileStatCard from "@/components/dashboard/profile/StatCard";
import ActivityTimeline from "@/components/dashboard/profile/ProfileActivity";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Profile</h2>
        <p className="text-gray-300">View and manage your account</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <WalletInfo />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileStatCard
            icon={<Shield className="w-5 h-5" />}
            title="Audit Count"
            value="32"
            subtitle="Last audit: 2 days ago"
          />
          <ProfileStatCard
            icon={<Star className="w-5 h-5" />}
            title="User Rating"
            value="4.8/5.0"
            subtitle="Based on 24 reviews"
          />
          <ProfileStatCard
            icon={<Layers className="w-5 h-5" />}
            title="Contributed Chains"
            value="5"
            subtitle="ETH, MATIC, AVAX, ARB, OP"
          />
        </div>

        <ActivityTimeline />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
