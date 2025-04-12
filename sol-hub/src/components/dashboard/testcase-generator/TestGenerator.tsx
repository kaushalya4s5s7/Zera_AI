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

const mockTestCode = `const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleToken", function () {
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const SimpleToken = await ethers.getContractFactory("SimpleToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await SimpleToken.deploy("Test Token", "TST");
    await token.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign total supply to owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      // Try to send 1 token from addr1 (0 tokens) to owner
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      // Owner balance shouldn't have changed
      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});`;

const mockFoundryCode = `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SimpleToken.sol";

contract SimpleTokenTest is Test {
    SimpleToken token;
    address owner;
    address user1;
    address user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        token = new SimpleToken("Test Token", "TST");
    }

    function testOwnership() public {
        assertEq(token.owner(), owner);
    }

    function testInitialSupply() public {
        assertEq(token.balanceOf(owner), token.totalSupply());
    }

    function testTransfer() public {
        token.transfer(user1, 50);
        assertEq(token.balanceOf(user1), 50);

        vm.prank(user1);
        token.transfer(user2, 50);
        assertEq(token.balanceOf(user2), 50);
    }

    function testFailInsufficientBalance() public {
        vm.prank(user1);
        token.transfer(owner, 1);
    }
}`;

const mockTestResults = [
  {
    id: 1,
    name: "Should set the right owner",
    status: "passed",
    duration: "0.23s",
  },
  {
    id: 2,
    name: "Should assign total supply to owner",
    status: "passed",
    duration: "0.18s",
  },
  {
    id: 3,
    name: "Should transfer tokens between accounts",
    status: "passed",
    duration: "0.45s",
  },
  {
    id: 4,
    name: "Should fail if sender doesn't have enough tokens",
    status: "failed",
    duration: "0.32s",
    error:
      "Contract was expected to revert with 'Not enough tokens', but didn't revert.",
  },
  {
    id: 5,
    name: "Should update balances after transfers",
    status: "passed",
    duration: "0.38s",
  },
];

const mockGasUsage = [
  { function: "transfer", cost: 48325, improvement: "+12%" },
  { function: "approve", cost: 32750, improvement: "+5%" },
  { function: "transferFrom", cost: 53420, improvement: "-3%" },
];

type TestGeneratorProps = {
  onGenerateTests?: (code: string, framework: string) => void;
  isGenerating?: boolean;
  generatedTests: string;
  testResults: any;

  contractCode?: string;
};

const TestGenerator = ({
  onGenerateTests,

  isGenerating = false,
  contractCode = "",
}: TestGeneratorProps) => {
  const [selectedFramework, setSelectedFramework] = useState(
    testFrameworks[0].id
  );
  const [testCode, setTestCode] = useState(mockTestCode);
  const [showResults, setShowResults] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Update test code when framework changes
    if (selectedFramework === "foundry") {
      setTestCode(mockFoundryCode);
    } else {
      setTestCode(mockTestCode);
    }
  }, [selectedFramework]);

  useEffect(() => {
    if (contractCode) {
      setCodeInput(contractCode);
    }
  }, [contractCode]);

  const handleGenerate = () => {
    if (!codeInput.trim()) {
      toast({
        title: "Empty Contract Code",
        description: "Please enter your smart contract code to generate tests",
        variant: "destructive",
      });
      return;
    }

    if (onGenerateTests) {
      onGenerateTests(codeInput, selectedFramework);
      setShowResults(true);
    } else {
      setShowResults(false);

      // Simulate test generation delay
      setTimeout(() => {
        setShowResults(true);

        toast({
          title: "Tests Generated",
          description: `Generated ${mockTestResults.length} test cases for your contract`,
        });
      }, 2500);
    }
  };

  const handleExport = () => {
    // Create a simple CSV for gas usage
    const csvContent =
      "Function,Gas Cost,Improvement\n" +
      mockGasUsage
        .map((item) => `${item.function},${item.cost},${item.improvement}`)
        .join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "gas_report.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Report Exported",
      description: "Gas usage report downloaded as CSV file",
    });
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
              <div className="flex items-center gap-3">
                <div className="text-2xl">{framework.icon}</div>
                <div>
                  <h4 className="font-semibold text-white">{framework.name}</h4>
                  <p className="text-sm text-gray-400">
                    {framework.description}
                  </p>
                </div>
              </div>
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
            className="w-full h-40 bg-slate-900-dark p-4 text-gray-100 font-mono text-sm focus:outline-none resize-none border border-white/10 rounded-lg"
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
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl overflow-hidden">
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
            className="w-full h-[300px] bg-slate-900-dark p-4 text-gray-100 font-mono text-sm focus:outline-none resize-none"
            spellCheck="false"
          ></textarea>
        </div>
      </div>

      {/* Test Results */}
      {showResults && (
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Test Results</h3>
            <div className="text-sm">
              <span className="text-green-400 font-medium mr-3">
                {mockTestResults.filter((t) => t.status === "passed").length}{" "}
                Passed
              </span>
              <span className="text-red-400 font-medium">
                {mockTestResults.filter((t) => t.status === "failed").length}{" "}
                Failed
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {mockTestResults.map((test) => (
              <div
                key={test.id}
                className={`p-4 rounded-lg border ${
                  test.status === "passed"
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {test.status === "passed" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-white font-medium">{test.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">{test.duration}</span>
                </div>

                {test.error && (
                  <div className="ml-7 mt-2 p-2 rounded bg-red-500/20 text-red-300 text-sm font-mono">
                    {test.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gas Usage */}
      {showResults && (
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Gas Usage Report
            </h3>
            <button
              onClick={handleExport}
              className="px-4 py-1.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-400 border-b border-white/10">
                <tr>
                  <th className="pb-2 font-medium">Function</th>
                  <th className="pb-2 font-medium">Gas Cost</th>
                  <th className="pb-2 font-medium">vs. Average</th>
                </tr>
              </thead>
              <tbody>
                {mockGasUsage.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 text-white font-mono">
                      {item.function}
                    </td>
                    <td className="py-3 text-white">
                      {item.cost.toLocaleString()}
                    </td>
                    <td
                      className={`py-3 ${
                        item.improvement.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.improvement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <div className="h-8 bg-white/5 rounded-lg overflow-hidden flex">
              {mockGasUsage.map((item, index) => {
                const percentage =
                  (item.cost /
                    mockGasUsage.reduce((sum, curr) => sum + curr.cost, 0)) *
                  100;
                return (
                  <div
                    key={index}
                    className={`h-full ${
                      index === 0
                        ? "bg-primary"
                        : index === 1
                        ? "bg-secondary"
                        : "bg-orange"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <div>0</div>
              <div>50,000</div>
              <div>100,000</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestGenerator;
