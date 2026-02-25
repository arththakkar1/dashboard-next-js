"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/components/ThemeProvider";

type Period = "week" | "month" | "year";

const weeklyData = [
  { label: "Mon", dineIn: 85, delivery: 42 },
  { label: "Tue", dineIn: 72, delivery: 38 },
  { label: "Wed", dineIn: 96, delivery: 55 },
  { label: "Thu", dineIn: 88, delivery: 48 },
  { label: "Fri", dineIn: 120, delivery: 68 },
  { label: "Sat", dineIn: 145, delivery: 82 },
  { label: "Sun", dineIn: 132, delivery: 75 },
];

const monthlyData = [
  { label: "Week 1", dineIn: 520, delivery: 280 },
  { label: "Week 2", dineIn: 610, delivery: 340 },
  { label: "Week 3", dineIn: 580, delivery: 310 },
  { label: "Week 4", dineIn: 690, delivery: 390 },
];

const yearlyData = [
  { label: "Jan", dineIn: 2200, delivery: 1100 },
  { label: "Feb", dineIn: 2050, delivery: 980 },
  { label: "Mar", dineIn: 2500, delivery: 1250 },
  { label: "Apr", dineIn: 2350, delivery: 1180 },
  { label: "May", dineIn: 2700, delivery: 1400 },
  { label: "Jun", dineIn: 2600, delivery: 1350 },
  { label: "Jul", dineIn: 2900, delivery: 1500 },
  { label: "Aug", dineIn: 3100, delivery: 1650 },
  { label: "Sep", dineIn: 2850, delivery: 1480 },
  { label: "Oct", dineIn: 3200, delivery: 1700 },
  { label: "Nov", dineIn: 3400, delivery: 1800 },
  { label: "Dec", dineIn: 3800, delivery: 2050 },
];

const dataMap: Record<Period, typeof weeklyData> = {
  week: weeklyData,
  month: monthlyData,
  year: yearlyData,
};

const subtitleMap: Record<Period, string> = {
  week: "Dine-in & delivery orders this week",
  month: "Dine-in & delivery orders this month",
  year: "Dine-in & delivery orders this year",
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
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrafficChart() {
  const { theme } = useTheme();
  const [period, setPeriod] = useState<Period>("week");
  const chartData = dataMap[period];

  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const barPrimary = theme === "dark" ? "#3b82f6" : "#2563eb";
  const barSecondary = theme === "dark" ? "#60a5fa" : "#3b82f6";
  const cursorFill =
    theme === "dark" ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.06)";

  return (
    <div className="animate-fade-in stagger-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Daily Orders
          </h3>
          <p className="text-sm text-muted-foreground">{subtitleMap[period]}</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Dine-in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary-light" />
          <span className="text-xs text-muted-foreground">Delivery</span>
        </div>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            barGap={4}
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
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: cursorFill, radius: 6 }}
            />
            <Bar
              dataKey="dineIn"
              name="Dine-in"
              fill={barPrimary}
              radius={[6, 6, 0, 0]}
              barSize={18}
            />
            <Bar
              dataKey="delivery"
              name="Delivery"
              fill={barSecondary}
              radius={[6, 6, 0, 0]}
              barSize={18}
              opacity={0.6}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
