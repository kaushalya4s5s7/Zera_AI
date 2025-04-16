// import { useState } from "react";
// import { supabase, isSupabaseConfigured } from "@/lib/supabase";
// import { useDispatch } from "react-redux";

// export const useSupabase = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const saveWalletAddress = async (address: string) => {
//     try {
//       // Check if Supabase is configured
//       if (!isSupabaseConfigured()) {
//         console.warn(
//           "Supabase is not configured. Wallet address will only be saved to Redux state."
//         );
//         return { success: false, error: "Supabase not configured" };
//       }

//       setLoading(true);
//       setError(null);

//       console.log("Attempting to save wallet address to Supabase:", address);

//       // For wallet-only flow without auth
//       // Create or update a profile entry for this wallet
//       const { error: upsertError, data } = await supabase
//         .from("profiles")
//         .upsert(
//           {
//             wallet_address: address,

//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString(),
//           },
//           { onConflict: "wallet_address" }
//         );

//       if (upsertError) {
//         console.error("Supabase upsert error:", upsertError);
//         throw upsertError;
//       }

//       console.log("Wallet address saved successfully to Supabase:", data);
//       return { success: true, data };
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Unknown error occurred";
//       console.error("Error saving wallet to Supabase:", errorMessage);
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getWalletProfile = async (address: string) => {
//     try {
//       // Check if Supabase is configured
//       if (!isSupabaseConfigured()) {
//         console.warn(
//           "Supabase is not configured. Cannot retrieve wallet profile."
//         );
//         return {
//           success: false,
//           error: "Supabase is not configured",
//           data: null,
//         };
//       }

//       setLoading(true);
//       setError(null);

//       const { data, error: fetchError } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("wallet_address", address)
//         .single();

//       if (fetchError) throw fetchError;

//       return { data, success: true };
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Unknown error occurred";
//       setError(errorMessage);
//       return { success: false, error: errorMessage, data: null };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     saveWalletAddress,
//     getWalletProfile,
//     loading,
//     error,
//     isSupabaseConfigured: isSupabaseConfigured(),
//   };
// };
