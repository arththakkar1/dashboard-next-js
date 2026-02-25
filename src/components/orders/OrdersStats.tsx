"use client";

import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "1,847",
    change: "+12.4%",
    changeType: "positive" as const,
    icon: ClipboardList,
    color: "from-primary to-primary-dark",
    bgLight: "bg-primary/10",
    subtitle: "vs last month",
    iconColor: "var(--primary)",
  },
  {
    title: "Pending",
    value: "23",
    change: "-8.1%",
    changeType: "positive" as const,
    icon: Clock,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-warning/10",
    subtitle: "awaiting prep",
    iconColor: "var(--warning)",
  },
  {
    title: "Completed",
    value: "1,692",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: CheckCircle2,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-success/10",
    subtitle: "vs last month",
    iconColor: "var(--success)",
  },
  {
    title: "Cancelled",
    value: "132",
    change: "+2.4%",
    changeType: "negative" as const,
    icon: XCircle,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-danger/10",
    subtitle: "vs last month",
    iconColor: "var(--danger)",
  },
];

export default function OrdersStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
        >
          <div
            className={`absolute left-0 top-0 h-1 w-full bg-linear-to-r ${stat.color} opacity-80`}
          />

          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    stat.changeType === "positive"
                      ? "bg-(--badge-success-bg) text-(--badge-success-text)"
                      : "bg-(--badge-danger-bg) text-(--badge-danger-text)"
                  }`}
                >
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </span>
              </div>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgLight} transition-transform duration-300 group-hover:scale-110`}
            >
              <stat.icon
                className="h-6 w-6"
                style={{ color: stat.iconColor }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
