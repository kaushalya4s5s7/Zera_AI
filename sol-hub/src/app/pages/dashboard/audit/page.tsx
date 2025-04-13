"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import CodeAnalyzer from "@/components/dashboard/audit/codeAnalyzer";
import AuditResults from "@/components/dashboard/audit/auditResults";
import { useToast } from "@/hooks/use-toast";
import { analyzeContractSecurity } from "../../../../../utils/mistralAI";

const AuditPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [auditScore, setAuditScore] = useState(0);
  const [issueCount, setIssueCount] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditReport, setAuditReport] = useState("");
  const { toast } = useToast();

  const handleAnalyze = async (code: string, chain: string) => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const auditResults = await analyzeContractSecurity(code, chain);
      setAuditReport(auditResults);

      // Calculate issue counts and score
      const lowerReport = auditResults.toLowerCase();
      const critical = (lowerReport.match(/critical/g) || []).length;
      const high = (lowerReport.match(/high/g) || []).length;
      const medium = (lowerReport.match(/medium/g) || []).length;
      const low = (lowerReport.match(/low/g) || []).length;
      const info = (lowerReport.match(/info/g) || []).length;

      setIssueCount({ critical, high, medium, low, info });

      const totalIssues = critical * 5 + high * 3 + medium * 2 + low;
      const score = Math.max(100 - totalIssues * 2, 40);
      setAuditScore(score);

      setShowResults(true);

      toast({
        title: "Audit Complete",
        description: `Audit completed with a score of ${score}%`,
      });
    } catch (error) {
      console.error("Error analyzing contract:", error);
      toast({
        title: "Audit Failed",
        description: "An error occurred during the audit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Security Audit</h2>
        <p className="text-gray-300">
          Analyze your smart contracts for vulnerabilities and security issues.
        </p>
      </div>

      <CodeAnalyzer onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {showResults && (
        <AuditResults
          score={auditScore}
          issueCount={issueCount}
          auditReport={auditReport}
        />
      )}
    </DashboardLayout>
  );
};

export default AuditPage;
