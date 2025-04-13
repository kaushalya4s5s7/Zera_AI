"use client";
import { Copy, CheckCircle, ExternalLink } from "lucide-react";
import { useState } from "react";

const WalletInfo = () => {
  const [copied, setCopied] = useState(false);

  // Mock wallet data
  const wallet = {
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    balance: "12.45 ETH",
    network: "Ethereum Mainnet",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Wallet Information
      </h3>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Connected Address</p>
          <div className="flex items-center gap-2">
            <div className="p-3 rounded-lg bg-white/5 flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <span className="font-mono text-white">
                  {truncateAddress(wallet.address)}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-white transition-colors"
                title="Copy address"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <a
              href={`https://etherscan.io/address/${wallet.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              title="View on Etherscan"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Balance</p>
            <div className="p-3 rounded-lg bg-white/5">
              <span className="text-white">{wallet.balance}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Network</p>
            <div className="p-3 rounded-lg bg-white/5 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white">{wallet.network}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
