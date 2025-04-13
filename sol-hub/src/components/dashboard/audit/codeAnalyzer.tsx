import { useState } from "react";
import { Play, AlertTriangle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample smart contract code
const sampleCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    address public owner;
    mapping(address => uint256) public balances;
    IERC20 public token;

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function deposit(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Vulnerable to reentrancy
        token.transfer(msg.sender, amount);
        balances[msg.sender] -= amount;
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}`;

const supportedChains = [
  { id: "ethereum", name: "Ethereum" },
  { id: "polygon", name: "Polygon" },
  { id: "arbitrum", name: "Arbitrum" },
  { id: "optimism", name: "Optimism" },
  { id: "bsc", name: "BSC" },
  { id: "avalanche", name: "Avalanche" },
];

type CodeAnalyzerProps = {
  onAnalyze: (code: string, chain: string) => void;
  isAnalyzing: boolean;
};

const CodeAnalyzer = ({ onAnalyze, isAnalyzing }: CodeAnalyzerProps) => {
  const [code, setCode] = useState(sampleCode);
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    // Call the onAnalyze function passed from the parent component
    onAnalyze(code, selectedChain);
  };

  return (
    <div className="grid grid-cols-1 gap-6 mb-6">
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Smart Contract Analysis
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Our AI will scan your contract for security vulnerabilities
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <label htmlFor="chain" className="text-sm text-gray-300 mr-2">
                Chain:
              </label>
              <select
                id="chain"
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="bg-white/5 border border-white/20 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {supportedChains.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-black rounded-xl border border-white/10 overflow-hidden">
          <div className="flex bg-black justify-between items-center px-4 py-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400">Vault.sol</span>
            </div>

            <div className="flex items-center gap-2 text-yellow-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">
                AI will identify potential security issues
              </span>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[400px] bg-transparent p-4 text-gray-100 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
              placeholder="Paste your smart contract code here..."
            ></textarea>

            {/* Simulated issue highlight */}
            <div className="absolute left-0 top-[169px] right-0 h-[24px] bg-red-500/10 border-l-4 border-red-500"></div>
            <div className="absolute left-0 top-[193px] right-0 h-[24px] bg-red-500/10 border-l-4 border-red-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyzer;
