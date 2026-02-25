"use client";

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

const data = [
  { category: "Biryani", revenue: 385000, orders: 562, rating: 4.8 },
  { category: "Curry", revenue: 320000, orders: 480, rating: 4.6 },
  { category: "Tandoori", revenue: 275000, orders: 410, rating: 4.7 },
  { category: "Breads", revenue: 180000, orders: 620, rating: 4.5 },
  { category: "Desserts", revenue: 145000, orders: 340, rating: 4.4 },
  { category: "Beverages", revenue: 120000, orders: 520, rating: 4.3 },
  { category: "Starters", revenue: 195000, orders: 380, rating: 4.5 },
  { category: "Thali", revenue: 210000, orders: 290, rating: 4.7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = data.find((d) => d.category === label);
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-lg">
        <p className="mb-1 text-xs font-semibold text-foreground">{label}</p>
        <p className="text-sm text-primary font-semibold">
          ₹{(payload[0].value / 1000).toFixed(0)}K revenue
        </p>
        {item && (
          <>
            <p className="text-xs text-muted-foreground">
              {item.orders} orders
            </p>
            <p className="text-xs text-muted-foreground">
              {item.rating} rating
            </p>
          </>
        )}
      </div>
    );
  }
  return null;
};

export default function CategoryPerformanceChart() {
  const { theme } = useTheme();

  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const barColor = theme === "dark" ? "#3b82f6" : "#2563eb";
  const cursorFill =
    theme === "dark" ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.06)";

  const sorted = [...data].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Category Performance
        </h3>
        <p className="text-sm text-muted-foreground">
          Revenue by menu category
        </p>
      </div>

      <div className="h-80 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={sorted}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              horizontal={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
              width={70}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: cursorFill }}
            />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill={barColor}
              radius={[0, 6, 6, 0]}
              maxBarSize={28}
              fillOpacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
