import { useState, useEffect } from "react";
import { Download, Check, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock code for initial display
const mockCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleStorage
 * @dev Store & retrieve a number
 */
contract SimpleStorage {
    uint256 private value;
    
    event ValueChanged(uint256 newValue);
    
    /**
     * @dev Store value in variable
     * @param _value The new value
     */
    function store(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }
    
    /**
     * @dev Return value
     * @return The current value
     */
    function retrieve() public view returns (uint256) {
        return value;
    }
}`;

// Mock optimizations suggestions
const mockOptimizations = [
  {
    title: "Use uint128 instead of uint256",
    description:
      "If your value won't exceed 2^128-1, using a smaller uint size saves gas",
    improvement: "~10%",
    priority: "medium",
  },
  {
    title: "Remove redundant event emission",
    description:
      "Consider if ValueChanged event is necessary for your use case",
    improvement: "~5%",
    priority: "low",
  },
  {
    title: "Add nonReentrant modifier to store function",
    description:
      "Add protection against reentrancy attacks for production contracts",
    improvement: "Security",
    priority: "high",
  },
];

type SplitPanelProps = {
  className?: string;
  onCodeChange?: (code: string) => void;
  isGenerating?: boolean;
  onFrameworkChange?: (framework: string) => void;
  documentation?: string;
};

const SplitPanel = ({
  className,
  onCodeChange,
  isGenerating = false,
  onFrameworkChange,
  documentation = "",
}: SplitPanelProps) => {
  const [code, setCode] = useState(mockCode);
  const [framework, setFramework] = useState("hardhat");
  const [docs, setDocs] = useState("");
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code);
    }
  }, [code, onCodeChange]);

  useEffect(() => {
    if (documentation) {
      setDocs(documentation);
    }
  }, [documentation]);

  const handleFrameworkChange = (fw: string) => {
    setFramework(fw);

    if (onFrameworkChange) {
      onFrameworkChange(fw);
    }

    toast({
      title: "Framework Changed",
      description: `Documentation style updated to ${
        fw.charAt(0).toUpperCase() + fw.slice(1)
      } format`,
    });
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);

    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleDownload = () => {
    // Create a blob with the markdown content
    const blob = new Blob([docs], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    // Create a temporary download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "documentation.md";
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Documentation Downloaded",
      description: "Documentation has been downloaded as Markdown",
    });
  };

  const handleApplyOptimization = (index: number) => {
    const optimization = mockOptimizations[index];

    // Apply optimizations to the code (simplified for demo)
    let newCode = code;
    if (optimization.title === "Use uint128 instead of uint256") {
      newCode = code.replace(
        /uint256 private value;/g,
        "uint128 private value;"
      );
    } else if (optimization.title === "Remove redundant event emission") {
      newCode = code.replace(/\s*emit ValueChanged\(_value\);/g, "");
    } else if (
      optimization.title === "Add nonReentrant modifier to store function"
    ) {
      // Would need to add the nonReentrant import and modify the function signature
      newCode = code.replace(
        "function store(uint256 _value) public {",
        "function store(uint256 _value) public nonReentrant {"
      );
    }

    setCode(newCode);
    handleCodeChange(newCode);

    toast({
      title: "Optimization Applied",
      description: `Applied: ${optimization.title}`,
    });
  };

  const handleEnhanceDocs = () => {
    setAiEnhanced(true);

    toast({
      title: "AI Enhancement Applied",
      description:
        "Documentation has been enhanced with AI suggestions and explanations",
    });
  };

  return (
    <div
      className={`bg-black/100 backdrop-blur border border-white/20 rounded-xl overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">
          Documentation Generator
        </h3>

        <div className="flex gap-2 items-center">
          <div className="flex rounded-lg overflow-hidden">
            {["hardhat", "foundry", "remix"].map((fw) => (
              <button
                key={fw}
                onClick={() => handleFrameworkChange(fw)}
                className={`px-3 py-1.5 text-sm ${
                  framework === fw
                    ? "bg-primary text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {fw.charAt(0).toUpperCase() + fw.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleEnhanceDocs}
            disabled={isGenerating}
            className={`ml-2 px-4 py-1.5 rounded-lg text-white flex items-center gap-2 ${
              aiEnhanced
                ? "bg-green-600 hover:bg-green-700"
                : "bg-orange hover:bg-orange/80"
            } transition-colors`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{aiEnhanced ? "Enhanced" : "Enhance with AI"}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!docs}
            className="ml-2 px-4 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Code Input */}
        <div className="border-r border-white/10">
          <div className="p-2 bg-slate-900-dark">
            <div className="flex gap-1.5 px-3 py-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-[500px] bg-transparent bg-black p-4 text-gray-100 font-mono text-sm focus:outline-none resize-none border border-white/10 rounded-md"
              spellCheck="false"
              placeholder="Paste your contract code here..."
            ></textarea>
          </div>
        </div>

        {/* Documentation Preview */}
        <div className="p-6 overflow-auto h-[calc(500px+2rem+42px)]">
          <div className="prose prose-invert max-w-none">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p className="text-gray-300">Generating documentation...</p>
              </div>
            ) : docs ? (
              <>
                <div className="bg-white/5 p-4 rounded-lg mb-6">
                  <h3 className="text-white font-medium text-lg mb-3">
                    Generated Documentation
                  </h3>
                  <div className="whitespace-pre-wrap text-gray-300 font-mono text-sm">
                    {docs}
                    {aiEnhanced && (
                      <div className="mt-6 p-3 border-t border-white/10 pt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-orange" />
                          <h4 className="text-orange">
                            AI-Enhanced Explanations
                          </h4>
                        </div>
                        <p className="text-gray-300">
                          The SimpleStorage contract is a basic example of state
                          management in Solidity. It follows the standard
                          practice of emitting events when state changes, which
                          is important for off-chain applications that need to
                          track contract state.
                        </p>
                        <p className="text-gray-300 mt-2">
                          The current implementation is gas-efficient for most
                          use cases but could be optimized further as noted in
                          the suggestions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium text-lg mb-3">
                    Gas Optimization Suggestions
                  </h3>
                  <div className="space-y-3">
                    {mockOptimizations.map((opt, index) => (
                      <div
                        key={index}
                        className="bg-white/5 p-4 rounded-lg border-l-4 border-primary"
                      >
                        <div className="flex justify-between">
                          <h4 className="text-white font-medium">
                            {opt.title}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-xs ${
                              opt.priority === "high"
                                ? "bg-red-500/20 text-red-300"
                                : opt.priority === "medium"
                                ? "bg-orange/20 text-orange-300"
                                : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {opt.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">
                          {opt.description}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            Estimated improvement: {opt.improvement}
                          </span>
                          <button
                            onClick={() => handleApplyOptimization(index)}
                            className="flex items-center gap-1 text-primary text-xs hover:text-primary/80 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            <span>Apply</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Sparkles className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Paste Your Smart Contract Code
                </h3>
                <p className="text-gray-300 mb-4 max-w-md">
                  Add your contract code on the left panel and click "Generate
                  Documentation" to create comprehensive documentation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitPanel;
