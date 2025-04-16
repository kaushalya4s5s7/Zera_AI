export const CHAIN_CONFIG = {
  Sepolia: {
    chainId: 11155111,
    name: "Sepolia",
    contractAddress: "0x311799344e53106315cbDe72649d7eD8De9A1bfA",
    explorer: "https://sepolia.etherscan.io",
  },
} as const;

export type ChainKey = keyof typeof CHAIN_CONFIG;

export const CONTRACT_ADDRESSES = {
  Sepolia: CHAIN_CONFIG.Sepolia.contractAddress,
} as const;

export const AUDIT_REGISTRY_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "contractHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "stars",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "summary",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "auditor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "AuditRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "contractHash",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "stars",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "summary",
        type: "string",
      },
    ],
    name: "registerAudit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getAllAudits",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "contractHashes",
        type: "bytes32[]",
      },
      {
        internalType: "uint8[]",
        name: "stars",
        type: "uint8[]",
      },
      {
        internalType: "string[]",
        name: "summaries",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "auditors",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "timestamps",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "auditor",
        type: "address",
      },
    ],
    name: "getAuditorHistory",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "contractHash",
        type: "bytes32",
      },
    ],
    name: "getContractAudits",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "stars",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "summary",
            type: "string",
          },
          {
            internalType: "address",
            name: "auditor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct AuditRegistry.AuditEntry[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getContractHashByIndex",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "contractHash",
        type: "bytes32",
      },
    ],
    name: "getLatestAudit",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "stars",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "summary",
            type: "string",
          },
          {
            internalType: "address",
            name: "auditor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct AuditRegistry.AuditEntry",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalContracts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
