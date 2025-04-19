"use client";
import { useState } from "react";
import { Code, FileJson } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WobbleCard } from "@/components/ui/wobble-card";

type ContractTemplateProps = {
  onSelect: (template: string) => void;
};

const ContractTemplateSelector = ({ onSelect }: ContractTemplateProps) => {
  const [selected, setSelected] = useState("erc20");
  const { toast } = useToast();

  const handleSelect = (template: string) => {
    if (template !== selected) {
      setSelected(template);
      onSelect(template);

      toast({
        title: `${template.toUpperCase()} Template Selected`,
        description: `Switched to ${
          template === "erc20" ? "ERC20 Token" : "NFT Collection"
        } template`,
      });
    }
  };

  return (
    <div className="bg-white/100 backdrop-blur border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-black mb-4">Select Template</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WobbleCard
          className={`relative p-6 bg-pink-300 rounded-lg  border transition-all cursor-pointer   
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
          ${
            selected === "erc20"
              ? "border-primary bg-primary/10 shadow-[0_8px_30px_rgba(0,122,255,0.1)]"
              : "border-white/10 hover:border-white/30"
          }`}
          onClick={() => handleSelect("erc20")}
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileJson className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold SHA text-black">ERC20 Token</h4>
              <p className="text-sm text-gray-300">Standard fungible token</p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            <p>Features:</p>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>Transfer and approval mechanisms</li>
              <li>Balance tracking</li>
              <li>Minting and burning</li>
              <li>Standard ERC20 compliance</li>
            </ul>
          </div>

          {selected === "erc20" && (
            <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full"></div>
          )}
        </WobbleCard>

        <WobbleCard
          className={`relative p-6 bg-pink-dark rounded-lg border transition-all cursor-pointer 
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
            ${
              selected === "nft"
                ? "border-primary bg-primary/10 shadow-[0_8px_30px_rgba(0,122,255,0.1)]"
                : "border-white/10' hover:border-white/30"
            }`}
          onClick={() => handleSelect("nft")}
        >
          <div className="flex e items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-black">NFT Collection</h4>
              <p className="text-sm text-gray-400">
                Non-fungible token standard
              </p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            <p>Features:</p>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>Unique token IDs</li>
              <li>Metadata support</li>
              <li>Transfer mechanisms</li>
              <li>Standard ERC721 compliance</li>
            </ul>
          </div>

          {selected === "nft" && (
            <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full"></div>
          )}
        </WobbleCard>
      </div>
    </div>
  );
};

export default ContractTemplateSelector;
