"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import CodeAnalyzer from "@/components/dashboard/audit/codeAnalyzer";
import AuditResults from "@/components//dashboard/audit/auditResults";
import { useToast } from "@/hooks/use-toast";
// Removed redundant import
import { analyzeContractSecurity } from "../../../../../utils/mistralAI";

const AuditPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [auditScore, setAuditScore] = useState(78);
  const [issueCount, setIssueCount] = useState({
    critical: 1,
    high: 2,
    medium: 3,
    low: 4,
    info: 2,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [contractCode, setContractCode] = useState("");
  const [selectedChain, setSelectedChain] = useState("ethereum");
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

    setContractCode(code);
    setSelectedChain(chain);
    setIsAnalyzing(true);

    try {
      // Call Mistral AI for analysis
      const auditResults = await analyzeContractSecurity(code, chain);
      setAuditReport(auditResults);

      // Calculate a score based on the report content
      const calculateScore = () => {
        const lowerReport = auditResults.toLowerCase();

        // Simple heuristic: check for issue mentions
        let criticalCount = (lowerReport.match(/critical/g) || []).length;
        let highCount = (lowerReport.match(/high severity/g) || []).length;
        let mediumCount = (lowerReport.match(/medium severity/g) || []).length;
        let lowCount = (lowerReport.match(/low severity/g) || []).length;
        let infoCount = (lowerReport.match(/informational/g) || []).length;

        // Adjust for false positives in explanations
        criticalCount = Math.min(criticalCount, 3);
        highCount = Math.min(highCount, 5);

        setIssueCount({
          critical: criticalCount,
          high: highCount,
          medium: mediumCount,
          low: lowCount,
          info: infoCount,
        });

        // Calculate score based on issue weight
        const totalIssues =
          criticalCount * 5 + highCount * 3 + mediumCount * 2 + lowCount;
        let score = 100 - totalIssues * 3;

        // Cap the score
        return Math.max(Math.min(score, 100), 40);
      };

      const calculatedScore = calculateScore();
      setAuditScore(calculatedScore);
      setShowResults(true);

      toast({
        title: "AI Audit Complete",
        description: `Smart contract analyzed with score: ${calculatedScore}%. Found ${Object.values(
          issueCount
        ).reduce((a, b) => a + b, 0)} potential issues.`,
      });
    } catch (error) {
      console.error("Error during contract audit:", error);
      toast({
        title: "Audit Failed",
        description:
          "There was an error analyzing your smart contract. Please try again.",
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
          Analyze your smart contracts for vulnerabilities and security issues
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
