"use client ";
import { Shield, Code, FileCheck, AlertCircle } from "lucide-react";

const activityData = [
  {
    id: 1,
    type: "audit",
    title: "Completed audit for TokenSwap contract",
    status: "completed",
    date: "Apr 10, 2025",
    icon: <Shield className="w-4 h-4" />,
    color: "bg-primary text-white",
  },
  {
    id: 2,
    type: "deployment",
    title: "Deployed ERC20 contract to Ethereum Mainnet",
    status: "completed",
    date: "Apr 8, 2025",
    icon: <Code className="w-4 h-4" />,
    color: "bg-secondary text-white",
  },
  {
    id: 3,
    type: "review",
    title: "Submitted NFT Collection for external review",
    status: "pending",
    date: "Apr 5, 2025",
    icon: <FileCheck className="w-4 h-4" />,
    color: "bg-orange/80 text-white",
  },
  {
    id: 4,
    type: "issue",
    title: "Fixed critical vulnerability in Staking contract",
    status: "completed",
    date: "Apr 2, 2025",
    icon: <AlertCircle className="w-4 h-4" />,
    color: "bg-red-500 text-white",
  },
];

const ActivityTimeline = () => {
  return (
    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

      <div className="space-y-6">
        {activityData.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center`}
              >
                {activity.icon}
              </div>

              {index < activityData.length - 1 && (
                <div className="absolute top-8 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-white/10 h-full"></div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-white font-medium">{activity.title}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                  {activity.date}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Status:{" "}
                <span
                  className={
                    activity.status === "completed"
                      ? "text-green-400"
                      : "text-orange-400"
                  }
                >
                  {activity.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
