import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/authStore";
import { disconnectWallet } from "@/store/authSlice";
import { connectMetamask, truncateAddress } from "../services/walletService";
import { useSupabase } from "./useSupabase";
import { useState } from "react";
import { toast } from "sonner";

export const useWallet = (useSupabaseIntegration = false) => {
  const dispatch = useDispatch<AppDispatch>();
  const wallet = useSelector((state: RootState) => state.wallet);
  const { saveWalletAddress, isSupabaseConfigured } = useSupabase();
  const [isSavingToSupabase, setSavingToSupabase] = useState(false);

  const connect = async () => {
    try {
      const address = await connectMetamask();

      if (useSupabaseIntegration && address) {
        // Check if Supabase is configured when trying to use it
        if (!isSupabaseConfigured && useSupabaseIntegration) {
          toast.warning(
            "Supabase is not configured. Your wallet is connected but not saved to a database."
          );
        }

        // Save wallet address to Supabase (this function will handle the case when Supabase is not configured)
        setSavingToSupabase(true);
        const result = await saveWalletAddress(address);
        setSavingToSupabase(false);

        if (!result.success) {
          console.error("Failed to save wallet to Supabase:", result.error);
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnect = () => {
    dispatch(disconnectWallet());
  };

  const getTruncatedAddress = () => {
    if (!wallet.address) return "";
    return truncateAddress(wallet.address);
  };

  return {
    connect,
    disconnect,
    getTruncatedAddress,
    isConnected: wallet.isConnected,
    isConnecting: wallet.isConnecting || isSavingToSupabase,
    address: wallet.address,
    error: wallet.error,
  };
};
