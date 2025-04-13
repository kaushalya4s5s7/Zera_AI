"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import ContractTemplateSelector from "@/components/dashboard/build/contractTemplateSelector";
import CodeEditor from "@/components/dashboard/build/codeEditor";
import { useToast } from "@/hooks/use-toast";
import { generateSmartContract } from "../../../../utils/mistralAI";

const BuildPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("erc20");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const { toast } = useToast();

  const handleGenerateSmartContract = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Input Required",
        description:
          "Please provide requirements for the AI to generate your contract",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const generatedContract = await generateSmartContract(
        aiPrompt,
        selectedTemplate === "erc20" ? "ERC20 token" : "NFT collection"
      );

      setGeneratedCode(generatedContract);

      toast({
        title: "Contract Generated",
        description: `AI has created a secure, optimized ${
          selectedTemplate === "erc20" ? "ERC20 token" : "NFT collection"
        } contract based on your requirements`,
      });
    } catch (error) {
      console.error("Error generating contract:", error);
      toast({
        title: "Generation Failed",
        description:
          "There was an error generating your smart contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Contract Builder</h2>
        <p className="text-gray-300">
          Create and deploy secure smart contracts
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ContractTemplateSelector onSelect={setSelectedTemplate} />

        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-white">
              AI-Assisted Generation
            </h3>

            <button
              onClick={handleGenerateSmartContract}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-purple-700 text-white hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Smart Contract</span>
                </>
              )}
            </button>
          </div>

          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g., Create a token with a 10M max supply, 2% transaction fee, and anti-whale protection..."
            className="w-full h-24 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <CodeEditor
          contractType={selectedTemplate}
          initialCode={generatedCode}
        />
      </div>
    </DashboardLayout>
  );
};

export default BuildPage;
