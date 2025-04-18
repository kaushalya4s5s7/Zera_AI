"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import SplitPanel from "@/components/dashboard/documentor/SplitPanel";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { generateContractDocumentation } from "../../../../../utils/mistralAI";

const DocsPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [framework, setFramework] = useState("hardhat");
  const [documentation, setDocumentation] = useState("");
  const { toast } = useToast();

  const handleGenerateDocs = async (code: string) => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please enter some code to generate documentation",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setSourceCode(code);

    try {
      const generatedDocs = await generateContractDocumentation(
        code,
        framework
      );
      setDocumentation(generatedDocs);

      toast({
        title: "Documentation Generated",
        description:
          "AI has created comprehensive documentation for your smart contract",
      });
    } catch (error) {
      console.error("Error generating documentation:", error);
      toast({
        title: "Generation Failed",
        description:
          "There was an error generating documentation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Documentation</h2>
        <p className="text-gray-300">
          Generate comprehensive documentation for your smart contracts
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              AI Documentation Generator
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Our AI can analyze your code and create detailed documentation
            </p>
          </div>

          <button
            onClick={() => handleGenerateDocs(sourceCode)}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-purple-700 text-white hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Docs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Documentation</span>
              </>
            )}
          </button>
        </div>
      </div>

      <SplitPanel
        onCodeChange={setSourceCode}
        isGenerating={isGenerating}
        onFrameworkChange={setFramework}
        documentation={documentation}
      />
    </DashboardLayout>
  );
};

export default DocsPage;
