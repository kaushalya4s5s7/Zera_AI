import { useState, useEffect } from "react";
import { CopyIcon, Save, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockErc20Code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC20(name, symbol) Ownable(initialOwner) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`;

const mockNftCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC721(name, symbol) Ownable(initialOwner) {}

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyOwner
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Override required functions
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}`;

type CodeEditorProps = {
  contractType: string;
  initialCode?: string;
};

const CodeEditor = ({ contractType, initialCode }: CodeEditorProps) => {
  const [code, setCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();

  // Update code when contract type or initialCode changes
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    } else {
      setCode(contractType === "erc20" ? mockErc20Code : mockNftCode);
    }
  }, [contractType, initialCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Contract code copied to clipboard",
    });
  };

  const handleSaveCode = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Contract Saved",
        description: "Your contract code has been saved successfully",
      });
    }, 1500);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      toast({
        title: "Contract Deployed",
        description: `Your ${
          contractType === "erc20" ? "ERC20 Token" : "NFT Collection"
        } has been deployed to the blockchain`,
        variant: "default",
      });
    }, 2500);
  };

  return (
    <div className="bg-black rounded-xl border border-white/10 overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-400">
            {contractType === "erc20" ? "Token.sol" : "NFTCollection.sol"}
          </span>
        </div>
        <button
          onClick={handleCopyCode}
          className="text-gray-400 hover:text-white transition-colors p-1"
          title="Copy code"
        >
          <CopyIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[500px] bg-transparent p-4 text-gray-100 font-mono text-sm focus:outline-none resize-none"
          spellCheck="false"
        ></textarea>
      </div>

      <div className="px-4 py-3 flex items-center justify-between border-t border-white/10">
        <div className="text-xs text-gray-500">
          Lines: {code.split("\n").length}
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-white/100 text-black hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSaveCode}
            disabled={isSaving}
          >
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-primary text-black hover:bg-primary/80 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleDeploy}
            disabled={isDeploying}
          >
            {isDeploying ? (
              "Deploying..."
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Deploy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
