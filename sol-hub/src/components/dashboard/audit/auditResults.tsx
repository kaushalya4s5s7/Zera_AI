"use client";

import { useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";
import useAuditStore from "@/store/auditStore";

const SeverityBadge = ({ severity }: { severity: string }) => {
  const validSeverity = severity || "unknown";
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
    switch (validSeverity) {
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
      <span>
        {validSeverity.charAt(0).toUpperCase() + validSeverity.slice(1)}
      </span>
    </div>
  );
};

interface AuditIssue {
  id: string;
  title: string;
  description: string;
  severity: string;
  source: string; // Which tool found the issue (Mistral, Slither, Mythril)
  line?: number | null;
  recommendation?: string;
}

// interface AuditResultsProps {
//   score: number;
//   issueCount: {
//     critical: number;
//     high: number;
//     medium: number;
//     low: number;
//     info: number;
//   };
//   issues?: AuditIssue[]; // Make issues optional
//   auditReport: string;
// }

const AuditResults = () => {
  const [selectedIssue, setSelectedIssue] = useState<AuditIssue | null>(null);

  const { issues, auditScore, auditReport, issueCount } = useAuditStore();

  console.log("Issues in AuditResults:", issues); // Debugging log
  console.log("Audit Report in AuditResults:", auditReport); // Debugging log
  console.log("Score in AuditResults:", auditScore); // Debugging log

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Audit Summary */}
      <div className="lg:col-span-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Audit Summary</h3>
        <p className="text-sm text-gray-300">
          Overall Security Score:{" "}
          <span
            className={`font-bold ${
              auditScore >= 80
                ? "text-green-400"
                : auditScore >= 60
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {auditScore}%
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

      {/* Detailed Issues */}
      <div className="lg:col-span-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Detailed Issues
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Issue List */}
          <div className="md:col-span-1 bg-black/20 rounded-lg p-4 overflow-auto max-h-[500px]">
            {issues.length > 0 ? (
              issues.map((issue: AuditIssue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer border ${
                    selectedIssue?.id === issue.id
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-white font-medium truncate pr-2">
                      {issue.title}
                    </div>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  <div className="text-xs text-gray-400">
                    {issue.source} {issue.line ? `• Line ${issue.line}` : ""}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm text-center">
                No issues found.
              </div>
            )}
          </div>

          {/* Issue Details */}
          <div className="md:col-span-2 bg-black/20 rounded-lg p-4">
            {selectedIssue ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-medium">
                    {selectedIssue.title}
                  </h4>
                  <SeverityBadge severity={selectedIssue.severity} />
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Source</div>
                  <div className="text-sm text-white">
                    {selectedIssue.source}
                  </div>
                </div>

                {selectedIssue.line && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-1">Location</div>
                    <div className="text-sm text-white">
                      Line {selectedIssue.line}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Description</div>
                  <div className="text-sm text-white whitespace-pre-wrap">
                    {selectedIssue.description}
                  </div>
                </div>

                {selectedIssue.recommendation && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-1">
                      Recommendation
                    </div>
                    <div className="text-sm text-white">
                      {selectedIssue.recommendation}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select an issue to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuditResults;
