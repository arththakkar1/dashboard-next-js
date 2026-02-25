"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type Period = "month" | "quarter" | "year";

const monthlyData = [
  { label: "Week 1", revenue: 72000, expenses: 35000 },
  { label: "Week 2", revenue: 85000, expenses: 41000 },
  { label: "Week 3", revenue: 78000, expenses: 38000 },
  { label: "Week 4", revenue: 92000, expenses: 44000 },
];

const quarterlyData = [
  { label: "Jan", revenue: 285000, expenses: 142000 },
  { label: "Feb", revenue: 312000, expenses: 158000 },
  { label: "Mar", revenue: 345000, expenses: 168000 },
];

const yearlyData = [
  { label: "Jan", revenue: 285000, expenses: 142000 },
  { label: "Feb", revenue: 312000, expenses: 158000 },
  { label: "Mar", revenue: 345000, expenses: 168000 },
  { label: "Apr", revenue: 298000, expenses: 155000 },
  { label: "May", revenue: 378000, expenses: 175000 },
  { label: "Jun", revenue: 356000, expenses: 170000 },
  { label: "Jul", revenue: 410000, expenses: 190000 },
  { label: "Aug", revenue: 445000, expenses: 205000 },
  { label: "Sep", revenue: 425000, expenses: 195000 },
  { label: "Oct", revenue: 480000, expenses: 215000 },
  { label: "Nov", revenue: 520000, expenses: 230000 },
  { label: "Dec", revenue: 590000, expenses: 255000 },
];

const dataMap: Record<Period, typeof monthlyData> = {
  month: monthlyData,
  quarter: quarterlyData,
  year: yearlyData,
};

const subtitleMap: Record<Period, string> = {
  month: "Weekly revenue & expenses this month",
  quarter: "Monthly revenue & expenses this quarter",
  year: "Monthly revenue & expenses this year",
};

const growthMap: Record<Period, string> = {
  month: "+18.2%",
  quarter: "+24.5%",
  year: "+31.8%",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-lg">
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm font-semibold"
            style={{ color: entry.color }}
          >
            {entry.name}: ₹{entry.value.toLocaleString("en-IN")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const { theme } = useTheme();
  const [period, setPeriod] = useState<Period>("year");
  const chartData = dataMap[period];

  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const primaryStroke = theme === "dark" ? "#3b82f6" : "#2563eb";
  const successStroke = theme === "dark" ? "#34d399" : "#10b981";

  return (
    <div className="animate-fade-in stagger-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Revenue Overview
          </h3>
          <p className="text-sm text-muted-foreground">{subtitleMap[period]}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-(--badge-success-bg) px-3 py-1.5">
            <TrendingUp className="h-4 w-4 text-(--badge-success-text)" />
            <span className="text-sm font-semibold text-(--badge-success-text)">
              {growthMap[period]}
            </span>
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Expenses</span>
        </div>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={primaryStroke}
                  stopOpacity={0.15}
                />
                <stop offset="95%" stopColor={primaryStroke} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={successStroke}
                  stopOpacity={0.15}
                />
                <stop offset="95%" stopColor={successStroke} stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke={primaryStroke}
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke={successStroke}
              strokeWidth={2.5}
              fill="url(#colorProfit)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
