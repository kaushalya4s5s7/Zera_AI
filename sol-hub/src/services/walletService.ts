import { ethers } from "ethers";
import { store } from "@/store/authStore";
import {
  connectWallet,
  connectWalletSuccess,
  connectWalletFailure,
} from "@/store/authSlice";

export const connectMetamask = async (saveToSupabase = false) => {
  try {
    store.dispatch(connectWallet());

    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error(
        "MetaMask is not installed. Please install MetaMask to connect."
      );
    }

    // Request account access
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    if (accounts.length === 0) {
      throw new Error(
        "No accounts found. Please unlock MetaMask and try again."
      );
    }

    // Get the connected address
    const address = accounts[0];

    // If saveToSupabase is true, we'll import the Supabase hook dynamically
    // to avoid circular dependencies
    if (saveToSupabase) {
      // The actual saving to Supabase will be handled by the component
      // that calls this function, using the useSupabase hook
<<<<<<< HEAD
=======
      console.log("Wallet address will be saved to Supabase");
>>>>>>> repoB/main
    } else {
      // Just update Redux state
      store.dispatch(connectWalletSuccess(address));
    }

    return address;
  } catch (error) {
    let errorMessage = "Failed to connect wallet";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    store.dispatch(connectWalletFailure(errorMessage));
    throw error;
  }
};

export const truncateAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};
