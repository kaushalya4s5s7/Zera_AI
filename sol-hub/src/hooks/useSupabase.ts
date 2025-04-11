import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useDispatch } from "react-redux";
import { connectWalletSuccess } from "@/store/authSlice";
import { toast } from "@/components/ui/toaster";

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const saveWalletAddress = async (address: string) => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.warn(
          "Supabase is not configured. Wallet address will only be saved to Redux state."
        );
        // Still dispatch to Redux, just skip Supabase
        dispatch(connectWalletSuccess(address));
        return { success: true };
      }

      setLoading(true);
      setError(null);

      // Get current user (if using Supabase Auth)
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // For wallet-only flow without auth
        // Create or update a profile entry for this wallet
        const { error: upsertError } = await supabase.from("profiles").upsert({
          wallet_address: address,
          id: address, // Using wallet address as ID for simplicity
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (upsertError) throw upsertError;
      } else {
        // If using Supabase Auth as well
        const { error: updateError } = await supabase.from("profiles").upsert({
          id: user.id,
          wallet_address: address,
          updated_at: new Date().toISOString(),
        });

        if (updateError) throw updateError;
      }

      // Dispatch to Redux
      dispatch(connectWalletSuccess(address));
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getWalletProfile = async (address: string) => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.warn(
          "Supabase is not configured. Cannot retrieve wallet profile."
        );
        return {
          success: false,
          error: "Supabase is not configured",
          data: null,
        };
      }

      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("wallet_address", address)
        .single();

      if (fetchError) throw fetchError;

      return { data, success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage, data: null };
    } finally {
      setLoading(false);
    }
  };

  return {
    saveWalletAddress,
    getWalletProfile,
    loading,
    error,
    isSupabaseConfigured: isSupabaseConfigured(),
  };
};
