import React from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { LogOut, Wallet } from "lucide-react";

const ConnectWalletButton: React.FC = () => {
  const {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    getTruncatedAddress,
  } = useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
          onClick={disconnect}
        >
          <span>{getTruncatedAddress()}</span>
          <LogOut size={18} />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2 transition-all"
    >
      <Wallet size={18} />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default ConnectWalletButton;
