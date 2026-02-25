"use client";

import { PieChart, Pie, Tooltip } from "recharts";
import { useTheme } from "@/components/ThemeProvider";

const LIGHT_COLORS = ["#2563eb", "#10b981", "#f59e0b"];
const DARK_COLORS = ["#3b82f6", "#34d399", "#fbbf24"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground">{d.name}</p>
        <p className="text-xs text-muted-foreground">
          {d.orders} orders · {d.value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function OrdersBreakdownChart() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const data = [
    { name: "Dine-in", value: 45, orders: 832, fill: colors[0] },
    { name: "Delivery", value: 35, orders: 647, fill: colors[1] },
    { name: "Takeaway", value: 20, orders: 370, fill: colors[2] },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">
          Order Type Breakdown
        </h3>
        <p className="text-sm text-muted-foreground">
          Distribution by order channel
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="shrink-0">
          <PieChart width={240} height={190}>
            <Pie
              data={data}
              cx={120}
              cy={95}
              innerRadius={55}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            />
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>

        <div className="flex w-full flex-col gap-4">
          {data.map((item, index) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {item.value}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({item.orders})
                  </span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: colors[index],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
