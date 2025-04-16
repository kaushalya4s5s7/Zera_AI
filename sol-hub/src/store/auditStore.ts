// store/auditStore.ts
import { create } from "zustand";

// Define the issue interface
interface AuditIssue {
  id: string;
  title: string;
  description: string;
  severity: string;
  source: string;
  line?: number | null;
  recommendation?: string;
}
interface Contract {
  id: number;
  name: string;
  chain: string;
  rating: number;
  auditor: string;
  date: string;
}
// Define issue count interface
interface IssueCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

// Define the store state and actions
interface AuditStore {
  // State
  auditScore: number;
  auditReport: string;
  contractHash: string;
  contracts: Contract[]; // Assuming contracts is an array of strings
  issues: AuditIssue[];
  issueCount: IssueCount;
  isLocked: boolean;

  // Actions
  setContracts: (contracts: Contract[]) => void; // Assuming contracts is an array of strings
  setAuditScore: (score: number) => void;
  setAuditReport: (report: string) => void;
  setContractHash: (hash: string) => void;
  setIssues: (issues: AuditIssue[]) => void;
  setIssueCount: (count: IssueCount) => void;
  setIsLocked: (locked: boolean) => void;

  // Reset state
  resetAuditState: () => void;
}

// Create the store
const useAuditStore = create<AuditStore>()((set) => ({
  // Initial state
  auditScore: 0,
  auditReport: "",
  contracts: [], // Assuming contracts is an array of strings
  contractHash: "",
  issues: [],
  issueCount: {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  },
  isLocked: true,

  // Actions
  setContracts: (contracts) => set({ contracts }),
  setAuditScore: (score) => set({ auditScore: score }),
  setAuditReport: (report) => set({ auditReport: report }),
  setContractHash: (hash) => set({ contractHash: hash }),
  setIssues: (issues) => set({ issues }),
  setIssueCount: (count) => set({ issueCount: count }),
  setIsLocked: (locked) => set({ isLocked: locked }),

  // Reset state function
  resetAuditState: () =>
    set({
      auditScore: 0,
      auditReport: "",
      contractHash: "",
      contracts: [],
      issues: [],
      issueCount: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        info: 0,
      },
      isLocked: true,
    }),
}));

export default useAuditStore;
