"use client";

import { ReactNode } from "react";

type ProfileStatCardProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
};

const ProfileStatCard = ({
  icon,
  title,
  value,
  subtitle,
}: ProfileStatCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>

        <div>
          <h3 className="text-lg font-semibold text-white">{value}</h3>
          <p className="text-sm text-gray-300">{title}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileStatCard;
