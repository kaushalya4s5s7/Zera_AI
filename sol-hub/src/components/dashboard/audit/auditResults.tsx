"use client";
import { useState } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  ExternalLink,
} from "lucide-react";

// Mock audit issues
const auditIssues = [
  {
    id: 1,
    severity: "critical",
    title: "Reentrancy Vulnerability",
    description:
      "The contract is vulnerable to a reentrancy attack in the withdraw function",
    lineNumbers: "45-52",
    explanation:
      "The contract updates balances after external calls, which allows an attacker to recursively call back into the contract before state is updated.",
    recommendation:
      "Follow the checks-effects-interactions pattern: update state before making external calls.",
  },
  {
    id: 2,
    severity: "high",
    title: "Unchecked Return Values",
    description: "External call return values are not checked",
    lineNumbers: "78",
    explanation:
      "Some ERC20 tokens don't revert on failure but return false. Not checking the return value can lead to silent failures.",
    recommendation:
      "Always check return values from external calls or use SafeERC20 library.",
  },
  {
    id: 3,
    severity: "medium",
    title: "Integer Overflow",
    description: "Potential integer overflow in fee calculation",
    lineNumbers: "103",
    explanation:
      "Multiplication before division can lead to overflow with large token amounts.",
    recommendation:
      "Use SafeMath library or Solidity 0.8.0+ built-in overflow checking.",
  },
  {
    id: 4,
    severity: "low",
    title: "Missing Zero Address Check",
    description: "No validation for zero address input",
    lineNumbers: "125",
    explanation:
      "Setting a zero address for critical roles like an owner could lock contract functionality permanently.",
    recommendation: "Add require statement to validate addresses are not zero.",
  },
  {
    id: 5,
    severity: "informational",
    title: "Inconsistent Naming Convention",
    description: "Variable naming doesn't follow Solidity style guide",
    lineNumbers: "Multiple",
    explanation:
      "Inconsistent naming makes the code harder to review and maintain.",
    recommendation:
      "Follow the Solidity style guide for consistent naming conventions.",
  },
];

// Component to display severity badge
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
  auditReport: string; // Add this property
}

const AuditResults = ({ score, issueCount }: AuditResultsProps) => {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

  const getScoreColor = () => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Score and issues summary */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Audit Score</h3>

          <div className="flex flex-col items-center">
            <div className="relative">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    score >= 90
                      ? "#4ADE80"
                      : score >= 70
                      ? "#FBBF24"
                      : "#EF4444"
                  }
                  strokeWidth="8"
                  strokeDasharray={`${(2 * Math.PI * 45 * score) / 100} ${
                    2 * Math.PI * 45 * (1 - score / 100)
                  }`}
                  strokeDashoffset={2 * Math.PI * 45 * 0.25}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${getScoreColor()}`}>
                  {score}
                </span>
              </div>
            </div>
            <p className="text-gray-300 mt-2">Security Score</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Issues Found
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-white">Critical</span>
              </div>
              <span className="text-red-400 font-semibold">
                {issueCount.critical}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange" />
                <span className="text-white">High</span>
              </div>
              <span className="text-orange font-semibold">
                {issueCount.high}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span className="text-white">Medium</span>
              </div>
              <span className="text-yellow-400 font-semibold">
                {issueCount.medium}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="text-white">Low</span>
              </div>
              <span className="text-blue-400 font-semibold">
                {issueCount.low}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-gray-400" />
                <span className="text-white">Informational</span>
              </div>
              <span className="text-gray-400 font-semibold">
                {issueCount.info}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit issues list */}
      <div className="lg:col-span-3">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              Security Issues
            </h3>
          </div>

          <div className="flex h-[600px]">
            {/* Issues list */}
            <div className="w-1/2 border-r border-white/10 overflow-y-auto">
              {auditIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                    selectedIssue === issue.id ? "bg-white/5" : ""
                  }`}
                  onClick={() => setSelectedIssue(issue.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-medium">{issue.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Line: {issue.lineNumbers}
                      </p>
                    </div>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {issue.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Issue details */}
            <div className="w-1/2 p-6 overflow-y-auto">
              {selectedIssue ? (
                (() => {
                  const issue = auditIssues.find((i) => i.id === selectedIssue);
                  if (!issue) return null;

                  return (
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-white">
                          {issue.title}
                        </h3>
                        <SeverityBadge severity={issue.severity} />
                      </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-300">
                            Description
                          </h4>
                          <p className="text-white mt-1">{issue.description}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-300">
                            Affected Lines
                          </h4>
                          <p className="text-white mt-1">{issue.lineNumbers}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-300">
                            Explanation
                          </h4>
                          <p className="text-white mt-1">{issue.explanation}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-300">
                            Recommendation
                          </h4>
                          <p className="text-white mt-1">
                            {issue.recommendation}
                          </p>
                        </div>

                        <div className="pt-2">
                          <a
                            href="#"
                            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
                          >
                            <span>Learn more about this vulnerability</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            <span>Fix Issue</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Info className="w-12 h-12 mb-4 opacity-50" />
                  <p>Select an issue to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditResults;
