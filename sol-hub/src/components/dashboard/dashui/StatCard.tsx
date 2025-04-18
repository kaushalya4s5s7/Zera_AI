"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
  className?: string;
};

const StatCard = ({
  title,
  value,
  icon,
  trend,
  colorClass = "bg-primary",
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-white/100 backdrop-blur border border-white/20 card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-black">{title}</p>
          <h3 className="text-2xl font-bold text-black mt-1">{value}</h3>

          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-900" : "text-red-900"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-xs text-black ml-2">vs last month</span>
            </div>
          )}
        </div>

        <div className={`${colorClass} p-3 rounded-lg text-black`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
