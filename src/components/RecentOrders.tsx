"use client";

import { MoreHorizontal, ExternalLink } from "lucide-react";
import Link from "next/link";

const orders = [
  {
    id: "#TBL-12",
    customer: "Rajesh Sharma",
    email: "Table 12 · Dine-in",
    product: "Butter Chicken Thali",
    amount: "₹1,450",
    status: "Served",
    date: "Feb 25, 2026",
    avatar: "RS",
    avatarColor: "from-orange-500 to-amber-500",
  },
  {
    id: "#DLV-384",
    customer: "Priya Patel",
    email: "Swiggy · Delivery",
    product: "Paneer Tikka + Naan (x2)",
    amount: "₹780",
    status: "Preparing",
    date: "Feb 25, 2026",
    avatar: "PP",
    avatarColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "#TBL-08",
    customer: "Amit Verma",
    email: "Table 8 · Dine-in",
    product: "Biryani Family Pack",
    amount: "₹2,200",
    status: "Served",
    date: "Feb 25, 2026",
    avatar: "AV",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "#DLV-383",
    customer: "Sneha Reddy",
    email: "Zomato · Delivery",
    product: "Dal Makhani + Rice",
    amount: "₹520",
    status: "Cancelled",
    date: "Feb 25, 2026",
    avatar: "SR",
    avatarColor: "from-rose-500 to-pink-500",
  },
  {
    id: "#TBL-05",
    customer: "Vikram Singh",
    email: "Table 5 · Dine-in",
    product: "Tandoori Platter + Lassi",
    amount: "₹1,850",
    status: "Served",
    date: "Feb 24, 2026",
    avatar: "VS",
    avatarColor: "from-violet-500 to-purple-600",
  },
];

const statusStyles: Record<string, string> = {
  Served:
    "bg-(--badge-success-bg) text-(--badge-success-text) border-transparent",
  Preparing:
    "bg-(--badge-warning-bg) text-(--badge-warning-text) border-transparent",
  Cancelled:
    "bg-(--badge-danger-bg) text-(--badge-danger-text) border-transparent",
};

export default function RecentOrders() {
  return (
    <div className="animate-fade-in stagger-5 rounded-2xl border border-border bg-card shadow-sm transition-colors">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Recent Orders
          </h3>
          <p className="text-sm text-muted-foreground">Latest food orders</p>
        </div>
        <Link
          href={"/orders"}
          className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-border"
        >
          View All
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Guest
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="group transition-colors hover:bg-secondary/50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${order.avatarColor} text-xs font-bold text-white`}
                    >
                      {order.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="font-mono text-sm text-foreground">
                    {order.id}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary-foreground">
                  {order.product}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-foreground">
                  {order.amount}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                  {order.date}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-secondary hover:text-foreground group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
