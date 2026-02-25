"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/components/ThemeProvider";

const data = [
  { label: "Mar", newCustomers: 120, returning: 280, total: 400 },
  { label: "Apr", newCustomers: 145, returning: 310, total: 455 },
  { label: "May", newCustomers: 168, returning: 345, total: 513 },
  { label: "Jun", newCustomers: 155, returning: 330, total: 485 },
  { label: "Jul", newCustomers: 190, returning: 380, total: 570 },
  { label: "Aug", newCustomers: 210, returning: 420, total: 630 },
  { label: "Sep", newCustomers: 195, returning: 405, total: 600 },
  { label: "Oct", newCustomers: 230, returning: 450, total: 680 },
  { label: "Nov", newCustomers: 248, returning: 470, total: 718 },
  { label: "Dec", newCustomers: 260, returning: 490, total: 750 },
  { label: "Jan", newCustomers: 275, returning: 510, total: 785 },
  { label: "Feb", newCustomers: 295, returning: 540, total: 835 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-lg">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm font-semibold"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CustomerInsightsChart() {
  const { theme } = useTheme();

  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const primaryColor = theme === "dark" ? "#3b82f6" : "#2563eb";
  const successColor = theme === "dark" ? "#34d399" : "#10b981";
  const violetColor = theme === "dark" ? "#a78bfa" : "#8b5cf6";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Customer Insights
        </h3>
        <p className="text-sm text-muted-foreground">
          New vs returning customers over 12 months
        </p>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: violetColor }}
          />
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
          <span className="text-xs text-muted-foreground">New</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: successColor }}
          />
          <span className="text-xs text-muted-foreground">Returning</span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="total"
              name="Total"
              stroke={violetColor}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="newCustomers"
              name="New"
              stroke={primaryColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="returning"
              name="Returning"
              stroke={successColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
