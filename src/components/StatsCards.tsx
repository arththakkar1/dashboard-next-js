"use client";

import {
  IndianRupee,
  Users,
  ClipboardList,
  Armchair,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Today's Revenue",
    value: "₹1,24,580",
    change: "+14.2%",
    changeType: "positive" as const,
    icon: IndianRupee,
    color: "from-primary to-primary-dark",
    bgLight: "bg-primary/10",
    subtitle: "vs yesterday",
    iconColor: "var(--primary)",
  },
  {
    title: "Guests Served",
    value: "384",
    change: "+9.8%",
    changeType: "positive" as const,
    icon: Users,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-success/10",
    subtitle: "vs yesterday",
    iconColor: "var(--success)",
  },
  {
    title: "Active Orders",
    value: "27",
    change: "-5.3%",
    changeType: "negative" as const,
    icon: ClipboardList,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-warning/10",
    subtitle: "vs yesterday",
    iconColor: "var(--warning)",
  },
  {
    title: "Table Occupancy",
    value: "78%",
    change: "+6.1%",
    changeType: "positive" as const,
    icon: Armchair,
    color: "from-sky-500 to-sky-600",
    bgLight: "bg-info/10",
    subtitle: "vs yesterday",
    iconColor: "var(--info)",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`animate-fade-in stagger-${index + 1} group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
        >
          {/* Gradient accent top line */}
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
