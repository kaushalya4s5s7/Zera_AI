import { useState, useEffect } from "react";
import {
  Play,
  Download,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateContractTests } from "../../../../utils/mistralAI";

import { WobbleCard } from "@/components/ui/wobble-card";

const testFrameworks = [
  {
    id: "hardhat",
    name: "Hardhat",
    icon: "🏠",
    description: "JavaScript/TypeScript based testing framework",
  },
  {
    id: "foundry",
    name: "Foundry",
    icon: "🛠️",
    description: "Solidity based testing framework",
  },
  {
    id: "truffle",
    name: "Truffle",
    icon: "🍫",
    description: "JavaScript based testing framework",
  },
];

interface TestGeneratorProps {
  isGenerating: boolean;
  contractCode: string;
  generatedTests: string;
  testResults: any;
  onGenerateTests: (code: string, framework: string) => Promise<void>;
}

const TestGenerator = ({ contractCode = "" }: TestGeneratorProps) => {
  const [selectedFramework, setSelectedFramework] = useState(
    testFrameworks[0].id
  );
  const [testCode, setTestCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [codeInput, setCodeInput] = useState(contractCode);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (contractCode) {
      setCodeInput(contractCode);
    }
  }, [contractCode]);

  const handleGenerate = async () => {
    if (!codeInput.trim()) {
      toast({
        title: "Empty Contract Code",
        description: "Please enter your smart contract code to generate tests",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setShowResults(false);

    try {
      // Call the AI to generate test cases
      const generatedTests = await generateContractTests(
        codeInput,
        selectedFramework
      );
      setTestCode(generatedTests);
      setShowResults(true);

      toast({
        title: "Tests Generated",
        description: `Test cases successfully generated for the ${selectedFramework} framework.`,
      });
    } catch (error) {
      console.error("Error generating tests:", error);
      toast({
        title: "Error",
        description: "Failed to generate test cases. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Framework Selection */}
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Select Testing Framework
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testFrameworks.map((framework) => (
            <div
              key={framework.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedFramework === framework.id
                  ? "border-primary bg-primary/10"
                  : "border-white/10 hover:border-white/30"
              }`}
              onClick={() => setSelectedFramework(framework.id)}
            >
              <WobbleCard className="flex  items-center gap-3">
                <div className="text-2xl">{framework.icon}</div>
                <div>
                  <h4 className="font-semibold text-white">{framework.name}</h4>
                  <p className="text-sm text-white">{framework.description}</p>
                </div>
              </WobbleCard>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-white mb-2">
            Contract Code to Test
          </h3>
          <textarea
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Paste your smart contract code here to generate tests..."
            className="w-full h-40 bg-slate-900 p-4 text-white font-mono text-sm focus:outline-none resize-none border border-white/10 rounded-lg"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Tests</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Code Editor */}
      {showResults && (
        <div className="bg-black backdrop-blur border border-white/20 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400">
                {selectedFramework === "foundry"
                  ? "SimpleToken.t.sol"
                  : "SimpleToken.test.js"}
              </span>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={testCode}
              onChange={(e) => setTestCode(e.target.value)}
              className="w-full h-[300px] bg-black p-4 text-gray-100 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestGenerator;
