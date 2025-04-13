import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ExternalLink,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data
const contracts = [
  {
    id: 1,
    name: "TokenSwap",
    chain: "Ethereum",
    rating: 95,
    auditor: "Alex Johnson",
    date: "Apr 10, 2025",
  },
  {
    id: 2,
    name: "NFT Marketplace",
    chain: "Polygon",
    rating: 88,
    auditor: "Maria Garcia",
    date: "Apr 8, 2025",
  },
  {
    id: 3,
    name: "Staking Platform",
    chain: "Arbitrum",
    rating: 92,
    auditor: "John Smith",
    date: "Apr 5, 2025",
  },
  {
    id: 4,
    name: "Yield Farming",
    chain: "Optimism",
    rating: 78,
    auditor: "Sarah Lee",
    date: "Apr 3, 2025",
  },
  {
    id: 5,
    name: "Lending Protocol",
    chain: "BSC",
    rating: 85,
    auditor: "Robert Chen",
    date: "Mar 29, 2025",
  },
  {
    id: 6,
    name: "DEX Aggregator",
    chain: "Avalanche",
    rating: 90,
    auditor: "Emily Wilson",
    date: "Mar 25, 2025",
  },
  {
    id: 7,
    name: "Wrapped Token",
    chain: "Ethereum",
    rating: 91,
    auditor: "Alex Johnson",
    date: "Mar 22, 2025",
  },
  {
    id: 8,
    name: "Governance Token",
    chain: "Polygon",
    rating: 83,
    auditor: "Maria Garcia",
    date: "Mar 20, 2025",
  },
  {
    id: 9,
    name: "NFT Staking",
    chain: "Arbitrum",
    rating: 79,
    auditor: "John Smith",
    date: "Mar 18, 2025",
  },
  {
    id: 10,
    name: "Flash Loan",
    chain: "Optimism",
    rating: 75,
    auditor: "Sarah Lee",
    date: "Mar 15, 2025",
  },
  {
    id: 11,
    name: "Insurance Protocol",
    chain: "BSC",
    rating: 87,
    auditor: "Robert Chen",
    date: "Mar 12, 2025",
  },
  {
    id: 12,
    name: "Bridge",
    chain: "Avalanche",
    rating: 82,
    auditor: "Emily Wilson",
    date: "Mar 10, 2025",
  },
];

// Helper function to determine the color based on rating
const getRatingColor = (rating: number) => {
  if (rating >= 90) return "bg-gradient-to-r from-secondary to-primary";
  if (rating >= 80) return "bg-gradient-to-r from-cyan to-primary";
  if (rating >= 70) return "bg-gradient-to-r from-orange to-primary";
  return "bg-gradient-to-r from-red-500 to-orange";
};

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

  // Get unique values for filters
  const uniqueChains = [
    ...new Set(contracts.map((contract) => contract.chain)),
  ];
  const uniqueAuditors = [
    ...new Set(contracts.map((contract) => contract.auditor)),
  ];

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
                      {uniqueChains.map((chain) => (
                        <option key={chain} value={chain}>
                          {chain}
                        </option>
                      ))}
                    </select>
                  </div>

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
                      {uniqueAuditors.map((auditor) => (
                        <option key={auditor} value={auditor}>
                          {auditor}
                        </option>
                      ))}
                    </select>
                  </div>

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
