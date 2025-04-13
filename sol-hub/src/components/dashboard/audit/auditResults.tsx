"use client";

import { useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  ExternalLink,
} from "lucide-react";

const SeverityBadge = ({ severity }: { severity: string }) => {
  const getBadgeStyles = () => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500";
      case "high":
        return "bg-orange/20 text-orange border-orange";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500";
    }
  };

  const getIcon = () => {
    switch (severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="w-3 h-3" />;
      case "medium":
        return <AlertCircle className="w-3 h-3" />;
      case "low":
        return <Info className="w-3 h-3" />;
      default:
        return <Info className="w-3 h-3" />;
    }
  };

  return (
    <div
      className={`px-2 py-0.5 rounded text-xs border flex items-center gap-1 ${getBadgeStyles()}`}
    >
      {getIcon()}
      <span>{severity.charAt(0).toUpperCase() + severity.slice(1)}</span>
    </div>
  );
};

interface AuditResultsProps {
  score: number;
  issueCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  auditReport: string;
}

const AuditResults = ({
  score,
  issueCount,
  auditReport,
}: AuditResultsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Audit Summary */}
      <div className="lg:col-span-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Audit Summary</h3>
        <p className="text-sm text-gray-300">
          Overall Security Score:{" "}
          <span
            className={`font-bold ${
              score >= 80
                ? "text-green-400"
                : score >= 60
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {score}%
          </span>
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(issueCount).map(([severity, count]) => (
            <div
              key={severity}
              className="flex flex-col items-center bg-black/20 p-4 rounded-lg"
            >
              <SeverityBadge severity={severity} />
              <span className="text-white font-medium mt-2">{count}</span>
              <span className="text-gray-400 text-xs capitalize">
                {severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Report */}
      <div className="lg:col-span-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Audit Report</h3>
        <pre className="text-sm text-gray-300 bg-black p-4 rounded-lg overflow-auto">
          {auditReport}
        </pre>
      </div>
    </div>
  );
};

export default AuditResults;
