"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  UtensilsCrossed,
  Truck,
  ShoppingBag,
  Users,
  Star,
  Clock,
} from "lucide-react";

const summaryItems = [
  {
    label: "Dine-in Revenue",
    value: "₹1,24,500",
    change: "+18%",
    positive: true,
    icon: UtensilsCrossed,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Delivery Revenue",
    value: "₹86,200",
    change: "+24%",
    positive: true,
    icon: Truck,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Takeaway Revenue",
    value: "₹42,800",
    change: "-5%",
    positive: false,
    icon: ShoppingBag,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Avg Table Turnover",
    value: "2.8x",
    change: "+0.3",
    positive: true,
    icon: Clock,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "Customer Satisfaction",
    value: "4.6/5",
    change: "+0.2",
    positive: true,
    icon: Star,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Repeat Customers",
    value: "68%",
    change: "+4%",
    positive: true,
    icon: Users,
    color: "text-[#8b5cf6]",
    bgColor: "bg-[#8b5cf6]/10",
  },
];

export default function DailySummary() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">
          Today&apos;s Summary
        </h3>
        <p className="text-sm text-muted-foreground">
          Feb 25, 2026 — Key metrics at a glance
        </p>
      </div>

      <div className="space-y-4">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.bgColor}`}
              >
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-foreground">
                {item.value}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  item.positive
                    ? "text-(--badge-success-text)"
                    : "text-(--badge-danger-text)"
                }`}
              >
                {item.positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
