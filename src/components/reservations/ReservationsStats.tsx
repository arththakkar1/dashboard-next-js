"use client";

import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Reservations",
    value: "284",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: CalendarCheck,
    color: "from-primary to-primary-dark",
    bgLight: "bg-primary/10",
    subtitle: "this month",
    iconColor: "var(--primary)",
  },
  {
    title: "Confirmed",
    value: "196",
    change: "+24.1%",
    changeType: "positive" as const,
    icon: CheckCircle2,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-success/10",
    subtitle: "vs last month",
    iconColor: "var(--success)",
  },
  {
    title: "Pending",
    value: "42",
    change: "-5.6%",
    changeType: "positive" as const,
    icon: Clock,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-warning/10",
    subtitle: "awaiting confirmation",
    iconColor: "var(--warning)",
  },
  {
    title: "Cancelled",
    value: "46",
    change: "+3.1%",
    changeType: "negative" as const,
    icon: XCircle,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-danger/10",
    subtitle: "vs last month",
    iconColor: "var(--danger)",
  },
];

export default function ReservationsStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`animate-fade-in stagger-${index + 1} group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
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
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bgLight} transition-transform duration-300 group-hover:scale-110`}
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
