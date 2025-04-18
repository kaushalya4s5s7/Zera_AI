"use client"; // ✅ Needed if using Next.js App Router (app/ folder)

import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardButton = () => {
  const { isConnected } = useWallet();
  const router = useRouter(); // ✅ Next.js way

  if (!isConnected) {
    return null;
  }

  return (
    <Button
      onClick={() => router.push("/pages/dashboard")}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center gap-2 transition-all"
    >
      Go to Dashboard
      <ArrowRight size={18} />
    </Button>
  );
};

export default DashboardButton;
