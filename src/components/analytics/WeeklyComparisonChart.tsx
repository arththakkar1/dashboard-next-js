"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/components/ThemeProvider";

const data = [
  { day: "Mon", thisWeek: 85, lastWeek: 72 },
  { day: "Tue", thisWeek: 92, lastWeek: 80 },
  { day: "Wed", thisWeek: 108, lastWeek: 95 },
  { day: "Thu", thisWeek: 96, lastWeek: 88 },
  { day: "Fri", thisWeek: 135, lastWeek: 118 },
  { day: "Sat", thisWeek: 162, lastWeek: 145 },
  { day: "Sun", thisWeek: 148, lastWeek: 132 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const diff = payload[0].value - payload[1].value;
    const pct = ((diff / payload[1].value) * 100).toFixed(1);
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
            {entry.name}: {entry.value} orders
          </p>
        ))}
        <div className="mt-1 border-t border-border pt-1">
          <p
            className={`text-xs font-semibold ${diff >= 0 ? "text-(--badge-success-text)" : "text-(--badge-danger-text)"}`}
          >
            {diff >= 0 ? "+" : ""}
            {diff} ({diff >= 0 ? "+" : ""}
            {pct}%)
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function WeeklyComparisonChart() {
  const { theme } = useTheme();

  const gridColor = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const thisWeekColor = theme === "dark" ? "#3b82f6" : "#2563eb";
  const lastWeekColor = theme === "dark" ? "#475569" : "#94a3b8";
  const cursorFill =
    theme === "dark" ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.06)";

  const totalThis = data.reduce((s, d) => s + d.thisWeek, 0);
  const totalLast = data.reduce((s, d) => s + d.lastWeek, 0);
  const growthPct = (((totalThis - totalLast) / totalLast) * 100).toFixed(1);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Weekly Comparison
          </h3>
          <p className="text-sm text-muted-foreground">
            This week vs last week orders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">{totalThis}</p>
            <p className="text-xs text-muted-foreground">this week</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right">
            <p className="text-lg font-bold text-muted-foreground">
              {totalLast}
            </p>
            <p className="text-xs text-muted-foreground">last week</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-(--badge-success-bg) px-2.5 py-1 text-xs font-semibold text-(--badge-success-text)">
            +{growthPct}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">This Week</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground" />
          <span className="text-xs text-muted-foreground">Last Week</span>
        </div>
      </div>

      <div className="h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
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
            <Bar
              dataKey="thisWeek"
              name="This Week"
              fill={thisWeekColor}
              radius={[6, 6, 0, 0]}
              maxBarSize={24}
            />
            <Bar
              dataKey="lastWeek"
              name="Last Week"
              fill={lastWeekColor}
              radius={[6, 6, 0, 0]}
              maxBarSize={24}
              fillOpacity={0.5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
