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
  { label: "Week 1", revenue: 420000, expenses: 185000, profit: 235000 },
  { label: "Week 2", revenue: 485000, expenses: 210000, profit: 275000 },
  { label: "Week 3", revenue: 460000, expenses: 198000, profit: 262000 },
  { label: "Week 4", revenue: 530000, expenses: 225000, profit: 305000 },
];

const quarterlyData = [
  { label: "Dec", revenue: 1650000, expenses: 720000, profit: 930000 },
  { label: "Jan", revenue: 1780000, expenses: 785000, profit: 995000 },
  { label: "Feb", revenue: 1840000, expenses: 810000, profit: 1030000 },
];

const yearlyData = [
  { label: "Mar", revenue: 1250000, expenses: 560000, profit: 690000 },
  { label: "Apr", revenue: 1320000, expenses: 590000, profit: 730000 },
  { label: "May", revenue: 1480000, expenses: 645000, profit: 835000 },
  { label: "Jun", revenue: 1390000, expenses: 620000, profit: 770000 },
  { label: "Jul", revenue: 1560000, expenses: 680000, profit: 880000 },
  { label: "Aug", revenue: 1680000, expenses: 730000, profit: 950000 },
  { label: "Sep", revenue: 1590000, expenses: 700000, profit: 890000 },
  { label: "Oct", revenue: 1720000, expenses: 750000, profit: 970000 },
  { label: "Nov", revenue: 1650000, expenses: 720000, profit: 930000 },
  { label: "Dec", revenue: 1780000, expenses: 785000, profit: 995000 },
  { label: "Jan", revenue: 1840000, expenses: 810000, profit: 1030000 },
  { label: "Feb", revenue: 1900000, expenses: 835000, profit: 1065000 },
];

const dataMap: Record<Period, typeof monthlyData> = {
  month: monthlyData,
  quarter: quarterlyData,
  year: yearlyData,
};

const subtitleMap: Record<Period, string> = {
  month: "Weekly breakdown this month",
  quarter: "Monthly breakdown this quarter",
  year: "Monthly breakdown this year",
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
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm font-semibold"
            style={{ color: entry.color }}
          >
            {entry.name}: ₹{(entry.value / 100000).toFixed(1)}L
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueAnalyticsChart() {
  const { theme } = useTheme();
  const [period, setPeriod] = useState<Period>("year");
  const chartData = dataMap[period];

  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const revenueStroke = theme === "dark" ? "#3b82f6" : "#2563eb";
  const profitStroke = theme === "dark" ? "#34d399" : "#10b981";
  const expenseStroke = theme === "dark" ? "#f87171" : "#ef4444";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Revenue, Expenses & Profit
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
      <div className="mb-4 flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Profit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-danger" />
          <span className="text-xs text-muted-foreground">Expenses</span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="analyticsRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={revenueStroke}
                  stopOpacity={0.15}
                />
                <stop offset="95%" stopColor={revenueStroke} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="analyticsProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={profitStroke} stopOpacity={0.15} />
                <stop offset="95%" stopColor={profitStroke} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="analyticsExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={expenseStroke} stopOpacity={0.1} />
                <stop offset="95%" stopColor={expenseStroke} stopOpacity={0} />
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
              tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke={revenueStroke}
              strokeWidth={2.5}
              fill="url(#analyticsRevenue)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              name="Profit"
              stroke={profitStroke}
              strokeWidth={2}
              fill="url(#analyticsProfit)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke={expenseStroke}
              strokeWidth={2}
              fill="url(#analyticsExpense)"
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
