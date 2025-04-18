"use client";
import DashboardLayout from "@/components/dashboard/dashlayout/dashlayout";
import DataTable from "@/components/dashboard/reports/DataTable";

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Reports</h2>
        <p className="text-gray-300">
          View and analyze your contract audit reports
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DataTable />
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
