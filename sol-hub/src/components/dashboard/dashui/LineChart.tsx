"use client";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  defs,
} from "recharts";

const data = [
  { month: "Jan", contracts: 65, audits: 28 },
  { month: "Feb", contracts: 59, audits: 32 },
  { month: "Mar", contracts: 80, audits: 47 },
  { month: "Apr", contracts: 81, audits: 50 },
  { month: "May", contracts: 56, audits: 42 },
  { month: "Jun", contracts: 55, audits: 38 },
  { month: "Jul", contracts: 72, audits: 45 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
        <p className="text-black font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="flex items-center text-sm"
          >
            <span
              className="w-2 h-2 inline-block rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type LineChartProps = {
  className?: string;
  title?: string;
};

const LineChart = ({
  className,
  title = "Contract Activity",
}: LineChartProps) => {
  return (
    <div
      className={`p-6 rounded-xl bg-white/90 backdrop-blur border border-slate-300 shadow-md ${className}`}
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            {/* ✅ SVG gradients declared inline */}
            <defs>
              <linearGradient
                id="gradientContracts"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradientAudits" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={1} />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={1} />
              </linearGradient>
            </defs>

            {/* chart body */}
            <CartesianGrid strokeDasharray="4 4" stroke="#CBD5E1" />
            <XAxis
              dataKey="month"
              stroke="#64748B"
              tick={{ fill: "#64748B" }}
            />
            <YAxis stroke="#64748B" tick={{ fill: "#64748B" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="contracts"
              stroke="url(#gradientContracts)"
              strokeWidth={3}
              dot={{ stroke: "#6366F1", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Contracts"
            />
            <Line
              type="monotone"
              dataKey="audits"
              stroke="url(#gradientAudits)"
              strokeWidth={3}
              dot={{ stroke: "#22D3EE", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Audits"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
