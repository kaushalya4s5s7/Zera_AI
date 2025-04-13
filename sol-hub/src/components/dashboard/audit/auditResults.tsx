"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { analyzeContractSecurity } from "../../../../utils/mistralAI";
import { useToast } from "@/hooks/use-toast";

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
  contractCode: string;
  chain: string;
}

const AuditResults = ({ contractCode, chain }: AuditResultsProps) => {
  const [auditIssues, setAuditIssues] = useState<any[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAuditIssues = async () => {
      setIsLoading(true);
      setAuditIssues([]);
      setSelectedIssue(null);

      try {
        const issues = await analyzeContractSecurity(contractCode, chain);
        const parsedIssues = JSON.parse(issues); // Ensure the response is parsed
        setAuditIssues(parsedIssues);
        toast({
          title: "Audit Completed",
          description: "Security issues have been successfully analyzed.",
        });
      } catch (error) {
        console.error("Error analyzing contract security:", error);
        toast({
          title: "Error",
          description: "Failed to analyze the contract. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditIssues();
  }, [contractCode, chain]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-4">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              Security Issues
            </h3>
          </div>

          <div className="flex h-[600px]">
            <div className="w-1/2 border-r border-white/10 overflow-y-auto">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="w-12 h-12 mb-4 animate-spin" />
                  <p>Analyzing contract...</p>
                </div>
              ) : auditIssues.length > 0 ? (
                auditIssues.map((issue, index) => (
                  <div
                    key={index}
                    className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                      selectedIssue === index ? "bg-white/5" : ""
                    }`}
                    onClick={() => setSelectedIssue(index)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">
                          {issue.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Line: {issue.lineNumbers || "N/A"}
                        </p>
                      </div>
                      <SeverityBadge severity={issue.severity} />
                    </div>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                      {issue.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Info className="w-12 h-12 mb-4 opacity-50" />
                  <p>No issues found or analysis not started.</p>
                </div>
              )}
            </div>

            <div className="w-1/2 p-6 overflow-y-auto">
              {selectedIssue !== null && auditIssues[selectedIssue] && (
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {auditIssues[selectedIssue].title}
                  </h3>
                  <p className="text-white mt-4">
                    {auditIssues[selectedIssue].description}
                  </p>
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
