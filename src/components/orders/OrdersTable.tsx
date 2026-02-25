"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Truck,
  ShoppingBag,
} from "lucide-react";

export interface Order {
  id: string;
  customer: string;
  type: "dine-in" | "delivery" | "takeaway";
  table?: string;
  platform?: string;
  items: string;
  itemCount: number;
  amount: string;
  status:
    | "Preparing"
    | "Ready"
    | "Served"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled"
    | "Pending";
  time: string;
  date: string;
  avatar: string;
  avatarColor: string;
}

const allOrders: Order[] = [
  {
    id: "#ORD-2048",
    customer: "Rajesh Sharma",
    type: "dine-in",
    table: "Table 12",
    items: "Butter Chicken, Garlic Naan (x2), Raita",
    itemCount: 4,
    amount: "₹1,450",
    status: "Served",
    time: "12:35 PM",
    date: "Feb 25, 2026",
    avatar: "RS",
    avatarColor: "from-orange-500 to-amber-500",
  },
  {
    id: "#ORD-2047",
    customer: "Priya Patel",
    type: "delivery",
    platform: "Swiggy",
    items: "Paneer Tikka, Naan (x2), Dal Fry",
    itemCount: 4,
    amount: "₹780",
    status: "Out for Delivery",
    time: "12:20 PM",
    date: "Feb 25, 2026",
    avatar: "PP",
    avatarColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "#ORD-2046",
    customer: "Amit Verma",
    type: "dine-in",
    table: "Table 8",
    items: "Hyderabadi Biryani (Family), Mirchi Ka Salan, Gulab Jamun (x4)",
    itemCount: 3,
    amount: "₹2,200",
    status: "Preparing",
    time: "12:15 PM",
    date: "Feb 25, 2026",
    avatar: "AV",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "#ORD-2045",
    customer: "Sneha Reddy",
    type: "delivery",
    platform: "Zomato",
    items: "Dal Makhani, Jeera Rice, Roti (x3)",
    itemCount: 3,
    amount: "₹520",
    status: "Cancelled",
    time: "12:05 PM",
    date: "Feb 25, 2026",
    avatar: "SR",
    avatarColor: "from-rose-500 to-pink-500",
  },
  {
    id: "#ORD-2044",
    customer: "Vikram Singh",
    type: "dine-in",
    table: "Table 5",
    items: "Tandoori Platter, Mango Lassi (x2), Kulfi",
    itemCount: 4,
    amount: "₹1,850",
    status: "Served",
    time: "11:50 AM",
    date: "Feb 25, 2026",
    avatar: "VS",
    avatarColor: "from-violet-500 to-purple-600",
  },
  {
    id: "#ORD-2043",
    customer: "Meera Kapoor",
    type: "takeaway",
    items: "Chole Bhature, Masala Chai (x2)",
    itemCount: 2,
    amount: "₹340",
    status: "Ready",
    time: "11:42 AM",
    date: "Feb 25, 2026",
    avatar: "MK",
    avatarColor: "from-amber-500 to-yellow-500",
  },
  {
    id: "#ORD-2042",
    customer: "Karan Malhotra",
    type: "delivery",
    platform: "Swiggy",
    items: "Chicken Biryani, Raita, Papad",
    itemCount: 3,
    amount: "₹620",
    status: "Delivered",
    time: "11:30 AM",
    date: "Feb 25, 2026",
    avatar: "KM",
    avatarColor: "from-sky-500 to-blue-600",
  },
  {
    id: "#ORD-2041",
    customer: "Anita Deshmukh",
    type: "dine-in",
    table: "Table 3",
    items: "Paneer Butter Masala, Tandoori Roti (x4), Sweet Lassi",
    itemCount: 3,
    amount: "₹980",
    status: "Served",
    time: "11:15 AM",
    date: "Feb 25, 2026",
    avatar: "AD",
    avatarColor: "from-pink-500 to-fuchsia-500",
  },
  {
    id: "#ORD-2040",
    customer: "Ravi Kumar",
    type: "takeaway",
    items: "Veg Thali, Gulab Jamun (x2)",
    itemCount: 2,
    amount: "₹450",
    status: "Pending",
    time: "11:05 AM",
    date: "Feb 25, 2026",
    avatar: "RK",
    avatarColor: "from-teal-500 to-emerald-600",
  },
  {
    id: "#ORD-2039",
    customer: "Nisha Agarwal",
    type: "delivery",
    platform: "Zomato",
    items: "Mutton Rogan Josh, Sheermal (x2), Firni",
    itemCount: 3,
    amount: "₹1,680",
    status: "Delivered",
    time: "10:50 AM",
    date: "Feb 25, 2026",
    avatar: "NA",
    avatarColor: "from-indigo-500 to-violet-600",
  },
  {
    id: "#ORD-2038",
    customer: "Deepak Joshi",
    type: "dine-in",
    table: "Table 15",
    items: "Fish Curry, Appam (x3), Payasam",
    itemCount: 3,
    amount: "₹1,120",
    status: "Served",
    time: "10:35 AM",
    date: "Feb 25, 2026",
    avatar: "DJ",
    avatarColor: "from-lime-500 to-green-600",
  },
  {
    id: "#ORD-2037",
    customer: "Pooja Bhat",
    type: "delivery",
    platform: "Swiggy",
    items: "Masala Dosa, Filter Coffee (x2)",
    itemCount: 2,
    amount: "₹380",
    status: "Delivered",
    time: "10:20 AM",
    date: "Feb 24, 2026",
    avatar: "PB",
    avatarColor: "from-cyan-500 to-sky-600",
  },
];

const statusStyles: Record<string, string> = {
  Served: "bg-(--badge-success-bg) text-(--badge-success-text)",
  Delivered: "bg-(--badge-success-bg) text-(--badge-success-text)",
  Preparing: "bg-(--badge-warning-bg) text-(--badge-warning-text)",
  Pending: "bg-(--badge-warning-bg) text-(--badge-warning-text)",
  Ready: "bg-primary/10 text-primary",
  "Out for Delivery": "bg-info/10 text-info",
  Cancelled: "bg-(--badge-danger-bg) text-(--badge-danger-text)",
};

const typeIcons: Record<string, typeof UtensilsCrossed> = {
  "dine-in": UtensilsCrossed,
  delivery: Truck,
  takeaway: ShoppingBag,
};

const typeLabels: Record<string, string> = {
  "dine-in": "Dine-in",
  delivery: "Delivery",
  takeaway: "Takeaway",
};

interface OrdersTableProps {
  filterType: "all" | "dine-in" | "delivery" | "takeaway";
  searchQuery: string;
}

export default function OrdersTable({
  filterType,
  searchQuery,
}: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = allOrders.filter((order) => {
    const matchesType = filterType === "all" || order.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm transition-colors overflow-hidden">
      {/* Table Header */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            All Orders
          </h3>
          <p className="text-sm text-muted-foreground">
            {filtered.length} orders found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95">
            + New Order
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden divide-y divide-border">
        {paginated.map((order) => {
          const TypeIcon = typeIcons[order.type];
          return (
            <div key={order.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
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
                      {order.type === "dine-in"
                        ? order.table
                        : order.type === "delivery"
                          ? order.platform
                          : "Takeaway"}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono font-semibold text-foreground">
                  {order.id}
                </span>
                <span>·</span>
                <TypeIcon className="h-3 w-3" />
                <span>{typeLabels[order.type]}</span>
              </div>

              <p className="text-sm text-secondary-foreground truncate">
                {order.items}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {order.amount}
                </span>
                <span className="text-xs text-muted-foreground">
                  {order.time} · {order.date}
                </span>
              </div>

              {/* Mobile action buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
                <button className="flex items-center justify-center rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Type
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
                Time
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((order) => {
              const TypeIcon = typeIcons[order.type];
              return (
                <tr
                  key={order.id}
                  className="group transition-colors hover:bg-secondary/50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {order.id}
                    </span>
                  </td>
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
                          {order.type === "dine-in"
                            ? order.table
                            : order.type === "delivery"
                              ? order.platform
                              : "Takeaway"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <TypeIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-secondary-foreground">
                        {typeLabels[order.type]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="max-w-60 truncate text-sm text-secondary-foreground">
                      {order.items}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.itemCount} items
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-foreground">
                    {order.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <p className="text-sm text-foreground">{order.time}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-all group-hover:opacity-100">
                      <button
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Print"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="More"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          Showing{" "}
          <span className="font-medium text-foreground">
            {(currentPage - 1) * perPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-foreground">
            {Math.min(currentPage * perPage, filtered.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          orders
        </p>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
