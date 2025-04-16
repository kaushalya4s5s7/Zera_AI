"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import TestGenerator from "@/components/dashboard/testcase-generator/TestGenerator";
import { useToast } from "@/hooks/use-toast";
import {
  generateContractTests,
  simulateTestResults,
} from "../../../../../utils/mistralAI";

interface TestGeneratorProps {
  isGenerating: boolean;
  contractCode: string;
  generatedTests: string;
  testResults: any;
  onGenerateTests: (code: string, framework: string) => Promise<void>;
}

const TestPage = () => {
  const [contractCode, setContractCode] = useState("");
  const [isGeneratingTests, setIsGeneratingTests] = useState(false);
  const [testFramework, setTestFramework] = useState("hardhat");
  const [generatedTests, setGeneratedTests] = useState("");
  const [testResults, setTestResults] = useState<any>(null);
  const { toast } = useToast();

  const handleGenerateTests = async (code: string, framework: string) => {
    if (!code.trim()) {
      toast({
        title: "Empty Contract Code",
        description: "Please provide contract code to generate tests for",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingTests(true);
    setContractCode(code);
    setTestFramework(framework);

    try {
      const tests = await generateContractTests(code, framework);
      setGeneratedTests(tests);

      // In a real implementation, we would use the generated tests
      // For now, we'll simulate test results
      const results = simulateTestResults();
      setTestResults(results);

      toast({
        title: "Tests Generated",
        description: `Created ${results.passed + results.failed} tests (${
          results.passed
        } passing, ${results.failed} failing)`,
      });
    } catch (error) {
      console.error("Error generating tests:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating tests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingTests(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Test Suite</h2>
        <p className="text-gray-300">
          Generate and run automated tests for your smart contracts
        </p>
      </div>

      <TestGenerator
        onGenerateTests={handleGenerateTests}
        isGenerating={isGeneratingTests}
        contractCode={contractCode}
        generatedTests={generatedTests}
        testResults={testResults}
      />
    </DashboardLayout>
  );
};

export default TestPage;
