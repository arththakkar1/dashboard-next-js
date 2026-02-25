"use client";

import {
  UtensilsCrossed,
  CreditCard,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const activities = [
  {
    icon: UtensilsCrossed,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "New dine-in order",
    description: "Table 12 ordered Butter Chicken Thali",
    time: "2 min ago",
  },
  {
    icon: CreditCard,
    iconBg: "bg-(--badge-success-bg)",
    iconColor: "text-(--badge-success-text)",
    title: "Payment received",
    description: "₹2,200 from Table 8 (UPI)",
    time: "15 min ago",
  },
  {
    icon: Truck,
    iconBg: "bg-(--badge-warning-bg)",
    iconColor: "text-(--badge-warning-text)",
    title: "Delivery dispatched",
    description: "Order #DLV-384 picked up by rider",
    time: "30 min ago",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-(--badge-danger-bg)",
    iconColor: "text-(--badge-danger-text)",
    title: "Low stock alert",
    description: "Paneer running low — only 2 kg left",
    time: "1 hour ago",
  },
  {
    icon: CheckCircle2,
    iconBg: "bg-info/10",
    iconColor: "text-info",
    title: "Reservation confirmed",
    description: "Party of 8 at 8:00 PM tonight",
    time: "2 hours ago",
  },
  {
    icon: Clock,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Kitchen shift change",
    description: "Evening shift starts at 4:00 PM",
    time: "3 hours ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="animate-fade-in stagger-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Recent Activity
          </h3>
          <p className="text-sm text-muted-foreground">Latest updates</p>
        </div>
        <button className="text-xs font-medium text-primary hover:text-primary-dark transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary/50"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activity.iconBg}`}
            >
              <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground leading-tight">
                {activity.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
