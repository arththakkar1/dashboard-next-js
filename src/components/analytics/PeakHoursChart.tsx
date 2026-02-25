"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/components/ThemeProvider";

const data = [
  { hour: "10 AM", orders: 18 },
  { hour: "11 AM", orders: 35 },
  { hour: "12 PM", orders: 68 },
  { hour: "1 PM", orders: 82 },
  { hour: "2 PM", orders: 54 },
  { hour: "3 PM", orders: 28 },
  { hour: "4 PM", orders: 22 },
  { hour: "5 PM", orders: 30 },
  { hour: "6 PM", orders: 45 },
  { hour: "7 PM", orders: 72 },
  { hour: "8 PM", orders: 95 },
  { hour: "9 PM", orders: 88 },
  { hour: "10 PM", orders: 60 },
  { hour: "11 PM", orders: 32 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-lg">
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground">
          {payload[0].value} orders
        </p>
      </div>
    );
  }
  return null;
};

export default function PeakHoursChart() {
  const { theme } = useTheme();

  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const barColor = theme === "dark" ? "#3b82f6" : "#2563eb";
  const barHighlight = theme === "dark" ? "#f59e0b" : "#d97706";
  const cursorFill =
    theme === "dark" ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.06)";

  const maxOrders = Math.max(...data.map((d) => d.orders));

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Peak Hours Analysis
        </h3>
        <p className="text-sm text-muted-foreground">
          Average orders per hour today
        </p>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Regular hours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Peak hours</span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 11 }}
              interval={1}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: cursorFill }}
            />
            <Bar dataKey="orders" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.orders >= maxOrders * 0.8 ? barHighlight : barColor
                  }
                  fillOpacity={entry.orders >= maxOrders * 0.8 ? 1 : 0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
