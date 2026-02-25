"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Phone,
  CalendarDays,
  Armchair,
} from "lucide-react";
import type { ReservationStatus } from "./ReservationsFilters";

export interface Reservation {
  id: string;
  guest: string;
  phone: string;
  guests: number;
  table: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  note: string;
  avatar: string;
  avatarColor: string;
  occasion?: string;
}

const allReservations: Reservation[] = [
  {
    id: "RSV-201",
    guest: "Ananya Desai",
    phone: "+91 98765 43210",
    guests: 4,
    table: "Table 3",
    date: "Feb 25, 2026",
    time: "7:00 PM",
    status: "Confirmed",
    note: "Birthday celebration, need cake arrangement",
    avatar: "AD",
    avatarColor: "from-pink-500 to-fuchsia-500",
    occasion: "Birthday",
  },
  {
    id: "RSV-202",
    guest: "Rohan Mehta",
    phone: "+91 87654 32109",
    guests: 2,
    table: "Table 7",
    date: "Feb 25, 2026",
    time: "7:30 PM",
    status: "Confirmed",
    note: "Window seat preferred",
    avatar: "RM",
    avatarColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "RSV-203",
    guest: "Kavita Iyer",
    phone: "+91 76543 21098",
    guests: 6,
    table: "Table 1",
    date: "Feb 25, 2026",
    time: "8:00 PM",
    status: "Pending",
    note: "Family dinner, high chair needed",
    avatar: "KI",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "RSV-204",
    guest: "Suresh Nair",
    phone: "+91 65432 10987",
    guests: 3,
    table: "Table 10",
    date: "Feb 25, 2026",
    time: "8:30 PM",
    status: "Cancelled",
    note: "Plans changed",
    avatar: "SN",
    avatarColor: "from-orange-500 to-amber-500",
  },
  {
    id: "RSV-205",
    guest: "Deepa Joshi",
    phone: "+91 54321 09876",
    guests: 8,
    table: "Table 2",
    date: "Feb 25, 2026",
    time: "9:00 PM",
    status: "Confirmed",
    note: "Anniversary, special decoration",
    avatar: "DJ",
    avatarColor: "from-violet-500 to-purple-600",
    occasion: "Anniversary",
  },
  {
    id: "RSV-206",
    guest: "Arjun Kapoor",
    phone: "+91 43210 98765",
    guests: 5,
    table: "Table 5",
    date: "Feb 25, 2026",
    time: "7:15 PM",
    status: "Confirmed",
    note: "Corporate dinner",
    avatar: "AK",
    avatarColor: "from-sky-500 to-blue-600",
    occasion: "Corporate",
  },
  {
    id: "RSV-207",
    guest: "Meera Shah",
    phone: "+91 32109 87654",
    guests: 2,
    table: "Table 14",
    date: "Feb 25, 2026",
    time: "8:45 PM",
    status: "Pending",
    note: "Quiet corner preferred",
    avatar: "MS",
    avatarColor: "from-rose-500 to-pink-500",
  },
  {
    id: "RSV-208",
    guest: "Vikram Malhotra",
    phone: "+91 21098 76543",
    guests: 10,
    table: "Table 1 & 2",
    date: "Feb 26, 2026",
    time: "7:00 PM",
    status: "Confirmed",
    note: "Large party, pre-order menu",
    avatar: "VM",
    avatarColor: "from-amber-500 to-yellow-500",
  },
  {
    id: "RSV-209",
    guest: "Priya Reddy",
    phone: "+91 10987 65432",
    guests: 4,
    table: "Table 9",
    date: "Feb 26, 2026",
    time: "8:00 PM",
    status: "Pending",
    note: "Vegetarian menu only",
    avatar: "PR",
    avatarColor: "from-teal-500 to-emerald-600",
  },
  {
    id: "RSV-210",
    guest: "Nisha Agarwal",
    phone: "+91 09876 54321",
    guests: 3,
    table: "Table 11",
    date: "Feb 26, 2026",
    time: "9:30 PM",
    status: "Confirmed",
    note: "",
    avatar: "NA",
    avatarColor: "from-indigo-500 to-violet-600",
  },
  {
    id: "RSV-211",
    guest: "Amit Sharma",
    phone: "+91 98712 34560",
    guests: 2,
    table: "Table 6",
    date: "Feb 24, 2026",
    time: "7:30 PM",
    status: "Completed",
    note: "Date night",
    avatar: "AS",
    avatarColor: "from-lime-500 to-green-600",
    occasion: "Date Night",
  },
  {
    id: "RSV-212",
    guest: "Ritu Bhatia",
    phone: "+91 87612 34509",
    guests: 6,
    table: "Table 4",
    date: "Feb 24, 2026",
    time: "8:00 PM",
    status: "Completed",
    note: "Friends reunion",
    avatar: "RB",
    avatarColor: "from-cyan-500 to-sky-600",
  },
];

const statusStyles: Record<string, string> = {
  Confirmed: "bg-(--badge-success-bg) text-(--badge-success-text)",
  Completed: "bg-primary/10 text-primary",
  Pending: "bg-(--badge-warning-bg) text-(--badge-warning-text)",
  Cancelled: "bg-(--badge-danger-bg) text-(--badge-danger-text)",
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  Confirmed: CheckCircle2,
  Completed: CheckCircle2,
  Pending: Clock,
  Cancelled: XCircle,
};

interface ReservationsTableProps {
  filterStatus: ReservationStatus;
  searchQuery: string;
  onNewReservation?: () => void;
}

export default function ReservationsTable({
  filterStatus,
  searchQuery,
  onNewReservation,
}: ReservationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = allReservations.filter((r) => {
    const matchesStatus =
      filterStatus === "all" || r.status.toLowerCase() === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      r.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm transition-colors overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            All Reservations
          </h3>
          <p className="text-sm text-muted-foreground">
            {filtered.length} reservations found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNewReservation}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95"
          >
            + New Reservation
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden divide-y divide-border">
        {paginated.map((r) => {
          const StatusIcon = statusIcons[r.status];
          return (
            <div key={r.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${r.avatarColor} text-xs font-bold text-white`}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {r.guest}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {r.phone}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[r.status]}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {r.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="font-mono font-semibold text-foreground">
                  {r.id}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {r.guests} guests
                </span>
                <span className="flex items-center gap-1">
                  <Armchair className="h-3 w-3" />
                  {r.table}
                </span>
                {r.occasion && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {r.occasion}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {r.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {r.time}
                </span>
              </div>

              {r.note && (
                <p className="text-sm text-secondary-foreground italic truncate">
                  &ldquo;{r.note}&rdquo;
                </p>
              )}

              {/* Mobile actions */}
              <div className="flex items-center gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
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
                Reservation
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Guest
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date &amp; Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Table
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Guests
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Notes
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((r) => {
              const StatusIcon = statusIcons[r.status];
              return (
                <tr
                  key={r.id}
                  className="group transition-colors hover:bg-secondary/50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {r.id}
                      </span>
                      {r.occasion && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {r.occasion}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${r.avatarColor} text-xs font-bold text-white`}
                      >
                        {r.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {r.guest}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {r.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <p className="text-sm text-foreground">{r.date}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {r.time}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-secondary-foreground">
                      <Armchair className="h-3.5 w-3.5 text-muted-foreground" />
                      {r.table}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-secondary-foreground">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      {r.guests}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[r.status]}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="max-w-48 truncate text-sm text-secondary-foreground italic">
                      {r.note || "—"}
                    </p>
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
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
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

      {/* Empty state */}
      {paginated.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground/40" />
          <h4 className="mt-4 text-base font-semibold text-foreground">
            No reservations found
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}

      {/* Pagination */}
      {paginated.length > 0 && (
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
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            reservations
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
      )}
    </div>
  );
}
