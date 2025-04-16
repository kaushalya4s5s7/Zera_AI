// import { createClient } from "@supabase/supabase-js";
// import { Database } from "@/types/supabase";

// // These will be replaced with your actual Supabase URL and anon key
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// // Check if credentials are provided
// const hasSupabaseCredentials = supabaseUrl && supabaseAnonKey;

// // Create a placeholder client that throws informative errors if credentials are missing
// const createPlaceholderClient = () => {
//   return {
//     auth: {
//       getUser: async () => ({
//         data: { user: null },
//         error: new Error("Supabase credentials not configured"),
//       }),
//     },
//     from: () => ({
//       upsert: async () => ({
//         error: new Error("Supabase credentials not configured"),
//       }),
//       select: async () => ({
//         data: null,
//         error: new Error("Supabase credentials not configured"),
//       }),
//       single: async () => ({
//         data: null,
//         error: new Error("Supabase credentials not configured"),
//       }),
//       eq: () => ({
//         single: async () => ({
//           data: null,
//           error: new Error("Supabase credentials not configured"),
//         }),
//       }),
//     }),
//   } as any;
// };

// // Create the Supabase client only if credentials are provided
// export const supabase = hasSupabaseCredentials
//   ? createClient<Database>(supabaseUrl, supabaseAnonKey)
//   : createPlaceholderClient();

// // Helper function to check if Supabase is properly configured
// export const isSupabaseConfigured = () => hasSupabaseCredentials;
