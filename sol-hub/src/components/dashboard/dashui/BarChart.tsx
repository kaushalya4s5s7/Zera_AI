"use client";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", completed: 45, pending: 15 },
  { name: "Feb", completed: 52, pending: 10 },
  { name: "Mar", completed: 38, pending: 22 },
  { name: "Apr", completed: 65, pending: 18 },
  { name: "May", completed: 55, pending: 12 },
  { name: "Jun", completed: 70, pending: 8 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 p-3 border border-white/10 shadow-lg rounded-lg">
        <p className="text-white font-medium mb-1">{label}</p>
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

type BarChartProps = {
  className?: string;
  title?: string;
};

const BarChart = ({ className, title = "Audit Activity" }: BarChartProps) => {
  return (
    <div
      className={`p-6 rounded-xl bg-white/100 backdrop-blur border border-white/20 ${className}`}
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="completed"
              name="Completed"
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pending"
              name="Pending"
              fill="#4ADE80"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
