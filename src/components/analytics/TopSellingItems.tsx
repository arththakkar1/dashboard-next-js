"use client";

import { Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";

const items = [
  {
    rank: 1,
    name: "Hyderabadi Biryani",
    category: "Biryani",
    orders: 342,
    revenue: "₹2,39,400",
    trend: "up" as const,
    trendValue: "+12%",
  },
  {
    rank: 2,
    name: "Butter Chicken",
    category: "Curry",
    orders: 298,
    revenue: "₹2,08,600",
    trend: "up" as const,
    trendValue: "+8%",
  },
  {
    rank: 3,
    name: "Paneer Tikka",
    category: "Starters",
    orders: 256,
    revenue: "₹1,28,000",
    trend: "up" as const,
    trendValue: "+15%",
  },
  {
    rank: 4,
    name: "Garlic Naan",
    category: "Breads",
    orders: 412,
    revenue: "₹82,400",
    trend: "same" as const,
    trendValue: "0%",
  },
  {
    rank: 5,
    name: "Dal Makhani",
    category: "Curry",
    orders: 224,
    revenue: "₹1,12,000",
    trend: "up" as const,
    trendValue: "+5%",
  },
  {
    rank: 6,
    name: "Mango Lassi",
    category: "Beverages",
    orders: 318,
    revenue: "₹63,600",
    trend: "down" as const,
    trendValue: "-3%",
  },
  {
    rank: 7,
    name: "Gulab Jamun",
    category: "Desserts",
    orders: 186,
    revenue: "₹55,800",
    trend: "up" as const,
    trendValue: "+10%",
  },
  {
    rank: 8,
    name: "Tandoori Chicken",
    category: "Tandoori",
    orders: 198,
    revenue: "₹1,58,400",
    trend: "down" as const,
    trendValue: "-2%",
  },
];

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  same: Minus,
};

const trendColors = {
  up: "text-(--badge-success-text)",
  down: "text-(--badge-danger-text)",
  same: "text-muted-foreground",
};

export default function TopSellingItems() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm transition-colors overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            Top Selling Items
          </h3>
          <p className="text-sm text-muted-foreground">
            Best performing dishes this month
          </p>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="block md:hidden divide-y divide-border">
        {items.map((item) => {
          const TrendIcon = trendIcons[item.trend];
          return (
            <div key={item.rank} className="flex items-center gap-3 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                {item.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.orders} orders · {item.revenue}
                </p>
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold ${trendColors[item.trend]}`}
              >
                <TrendIcon className="h-3 w-3" />
                {item.trendValue}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Orders
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Revenue
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => {
              const TrendIcon = trendIcons[item.trend];
              return (
                <tr
                  key={item.rank}
                  className="group transition-colors hover:bg-secondary/50"
                >
                  <td className="whitespace-nowrap px-6 py-3.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                      {item.rank}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-semibold text-foreground">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {item.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-right text-sm font-medium text-foreground">
                    {item.orders}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-right text-sm font-semibold text-foreground">
                    {item.revenue}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${trendColors[item.trend]}`}
                    >
                      <TrendIcon className="h-3.5 w-3.5" />
                      {item.trendValue}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
