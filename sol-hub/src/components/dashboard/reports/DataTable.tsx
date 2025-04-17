import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ExternalLink,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  CONTRACT_ADDRESSES,
  AUDIT_REGISTRY_ABI,
  CHAIN_CONFIG,
  type ChainKey,
} from "../../../../utils/Contract";

import useAuditStore from "@/store/auditStore";

type DataTableProps = {
  className?: string;
};

const DataTable = ({ className }: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [chainFilter, setChainFilter] = useState<string | null>(null);
  const [auditorFilter, setAuditorFilter] = useState<string | null>(null);
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 100 });
  const itemsPerPage = 5;
  const { toast } = useToast();

  const { contracts, setContracts } = useAuditStore();

  // Initialize Ethers provider and contract instance
  // ...existing imports...

  // Add error handling and logging for contract calls
  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const network = await provider.getNetwork();
          const chainId = Number(network.chainId);

          if (chainId !== CHAIN_CONFIG.BNB.chainId) {
            toast({
              title: "Wrong Network",
              description: "Please switch to BNB Mainnet",
              variant: "destructive",
            });
            return;
          }
          const signer = await provider.getSigner();

          // Log contract address and network
          const contractAddress =
            CONTRACT_ADDRESSES[network.name as ChainKey] ||
            CONTRACT_ADDRESSES.BNB;
          console.log("Network:", network.name);
          console.log("Contract Address:", contractAddress);

          const auditRegistry = new ethers.Contract(
            contractAddress,
            AUDIT_REGISTRY_ABI,
            signer
          );

          try {
            // Verify contract exists
            const code = await provider.getCode(contractAddress);

            if (code === "0x") {
              throw new Error("No contract deployed at this address");
            }

            // Get total contracts with better error handling
            const totalContracts = await auditRegistry.getTotalContracts();

            const allAudits = [];
            const total = Number(totalContracts);
            console.log("Total Contracts:", total);

            for (let i = 0; i < total; i++) {
              try {
                const hash = await auditRegistry.getContractHashByIndex(i);
                const audit = await auditRegistry.getLatestAudit(hash);

                console.log(audit);

                
                allAudits.push({
                  id: i,
                  name: `Contract ${i}`,
                  chain: "Binance Smart Chain",
                  rating: Number(audit.stars) * 20,
                  auditor: audit.auditor,
                  date: new Date(
                    Number(audit.timestamp) * 1000
                  ).toLocaleDateString(),
                });
              } catch (error) {
                console.error(`Error fetching audit ${i}:`, error);
                continue;
              }
            }
            setContracts(allAudits);
          } catch (error) {
            console.error("Contract call error:", error);
            toast({
              title: "Contract Error",
              description:
                "Failed to read from the smart contract. Please verify the contract address and network.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Provider/Signer error:", error);
          toast({
            title: "Wallet Error",
            description:
              "Failed to connect to your wallet. Please check your connection and network.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "No Wallet Detected",
          description: "Please install MetaMask or another Ethereum wallet.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [toast]);

  // Helper function to determine the color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "bg-gradient-to-r from-secondary to-primary";
    if (rating >= 80) return "bg-gradient-to-r from-cyan to-primary";
    if (rating >= 70) return "bg-gradient-to-r from-orange to-primary";
    return "bg-gradient-to-r from-red-500 to-orange";
  };

  // Filter contracts based on search term and filters
  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.chain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.auditor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChainFilter = !chainFilter || contract.chain === chainFilter;
    const matchesAuditorFilter =
      !auditorFilter || contract.auditor === auditorFilter;
    const matchesRatingRange =
      contract.rating >= ratingRange.min && contract.rating <= ratingRange.max;
    return (
      matchesSearch &&
      matchesChainFilter &&
      matchesAuditorFilter &&
      matchesRatingRange
    );
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContracts = filteredContracts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset filters
  const resetFilters = () => {
    setChainFilter(null);
    setAuditorFilter(null);
    setRatingRange({ min: 0, max: 100 });
    setShowFilterMenu(false);
    toast({
      title: "Filters Reset",
      description: "All report filters have been cleared",
    });
  };

  const handleViewReport = (contractId: number) => {
    toast({
      title: "Report Opened",
      description: `Viewing detailed report for contract #${contractId}`,
    });
  };

  const handleApproveReport = (contractId: number) => {
    toast({
      title: "Report Approved",
      description: `Contract #${contractId} report has been approved`,
      variant: "default",
    });
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold text-white">Contract Reports</h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900-dark border border-white/20 rounded-lg p-4 z-10">
                <h4 className="text-sm font-medium text-white mb-3">
                  Filter Reports
                </h4>
                <div className="space-y-4">
                  {/* Chain Filter */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Chain
                    </label>
                    <select
                      className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-1.5"
                      value={chainFilter || ""}
                      onChange={(e) => setChainFilter(e.target.value || null)}
                    >
                      <option value="">All Chains</option>
                      {/* Dynamically populate chains */}
                    </select>
                  </div>
                  {/* Auditor Filter */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Auditor
                    </label>
                    <select
                      className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-1.5"
                      value={auditorFilter || ""}
                      onChange={(e) => setAuditorFilter(e.target.value || null)}
                    >
                      <option value="">All Auditors</option>
                      {/* Dynamically populate auditors */}
                    </select>
                  </div>
                  {/* Rating Range */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Rating Range: {ratingRange.min} - {ratingRange.max}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ratingRange.min}
                      onChange={(e) =>
                        setRatingRange({
                          ...ratingRange,
                          min: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ratingRange.max}
                      onChange={(e) =>
                        setRatingRange({
                          ...ratingRange,
                          max: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={resetFilters}
                      className="px-3 py-1 text-xs text-red-400 hover:text-red-300"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="px-3 py-1 text-xs bg-primary text-white rounded"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-white/5 text-gray-400">
            <tr>
              <th className="px-6 py-3 rounded-tl-lg">Contract</th>
              <th className="px-6 py-3">Chain</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Auditor</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContracts.length > 0 ? (
              currentContracts.map((contract, index) => (
                <tr
                  key={contract.id}
                  className={`border-b ${
                    index === currentContracts.length - 1
                      ? ""
                      : "border-white/10"
                  } hover:bg-white/5`}
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {contract.name}
                  </td>
                  <td className="px-6 py-4">{contract.chain}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-white/10">
                        <div
                          className={`h-2 rounded-full ${getRatingColor(
                            contract.rating
                          )}`}
                          style={{ width: `${contract.rating}%` }}
                        ></div>
                      </div>
                      <span>{contract.rating}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{contract.auditor}</td>
                  <td className="px-6 py-4">{contract.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewReport(contract.id)}
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApproveReport(contract.id)}
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No reports match your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredContracts.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredContracts.length)} of{" "}
            {filteredContracts.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({
              length: Math.ceil(filteredContracts.length / itemsPerPage),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                paginate(
                  Math.min(
                    currentPage + 1,
                    Math.ceil(filteredContracts.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage ===
                Math.ceil(filteredContracts.length / itemsPerPage)
              }
              className={`p-2 rounded-lg ${
                currentPage ===
                Math.ceil(filteredContracts.length / itemsPerPage)
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
