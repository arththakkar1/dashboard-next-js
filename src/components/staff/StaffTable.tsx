"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  Star,
  UsersRound,
} from "lucide-react";
import type { StaffRole } from "./StaffFilters";

export interface StaffMember {
  id: string;
  name: string;
  role: "Chef" | "Waiter" | "Manager" | "Host" | "Bartender" | "Cashier";
  phone: string;
  email: string;
  shift: "Morning" | "Afternoon" | "Evening" | "Night";
  status: "On Duty" | "Off Duty" | "On Leave";
  rating: number;
  joinDate: string;
  avatar: string;
  avatarColor: string;
}

const allStaff: StaffMember[] = [
  {
    id: "STF-001",
    name: "Rajesh Kumar",
    role: "Chef",
    phone: "+91 98765 43210",
    email: "rajesh.k@spicekitchen.in",
    shift: "Morning",
    status: "On Duty",
    rating: 4.9,
    joinDate: "Mar 2022",
    avatar: "RK",
    avatarColor: "from-orange-500 to-amber-500",
  },
  {
    id: "STF-002",
    name: "Priya Sharma",
    role: "Manager",
    phone: "+91 87654 32109",
    email: "priya.s@spicekitchen.in",
    shift: "Morning",
    status: "On Duty",
    rating: 4.8,
    joinDate: "Jan 2021",
    avatar: "PS",
    avatarColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "STF-003",
    name: "Amit Patel",
    role: "Waiter",
    phone: "+91 76543 21098",
    email: "amit.p@spicekitchen.in",
    shift: "Evening",
    status: "On Duty",
    rating: 4.6,
    joinDate: "Jun 2023",
    avatar: "AP",
    avatarColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "STF-004",
    name: "Sunita Reddy",
    role: "Host",
    phone: "+91 65432 10987",
    email: "sunita.r@spicekitchen.in",
    shift: "Evening",
    status: "On Duty",
    rating: 4.7,
    joinDate: "Sep 2022",
    avatar: "SR",
    avatarColor: "from-pink-500 to-fuchsia-500",
  },
  {
    id: "STF-005",
    name: "Vikram Singh",
    role: "Chef",
    phone: "+91 54321 09876",
    email: "vikram.s@spicekitchen.in",
    shift: "Afternoon",
    status: "On Duty",
    rating: 4.5,
    joinDate: "Feb 2023",
    avatar: "VS",
    avatarColor: "from-violet-500 to-purple-600",
  },
  {
    id: "STF-006",
    name: "Meera Joshi",
    role: "Waiter",
    phone: "+91 43210 98765",
    email: "meera.j@spicekitchen.in",
    shift: "Morning",
    status: "On Leave",
    rating: 4.3,
    joinDate: "Nov 2023",
    avatar: "MJ",
    avatarColor: "from-rose-500 to-pink-500",
  },
  {
    id: "STF-007",
    name: "Arjun Nair",
    role: "Bartender",
    phone: "+91 32109 87654",
    email: "arjun.n@spicekitchen.in",
    shift: "Night",
    status: "On Duty",
    rating: 4.7,
    joinDate: "Apr 2022",
    avatar: "AN",
    avatarColor: "from-sky-500 to-blue-600",
  },
  {
    id: "STF-008",
    name: "Kavita Iyer",
    role: "Cashier",
    phone: "+91 21098 76543",
    email: "kavita.i@spicekitchen.in",
    shift: "Morning",
    status: "On Duty",
    rating: 4.4,
    joinDate: "Aug 2023",
    avatar: "KI",
    avatarColor: "from-amber-500 to-yellow-500",
  },
  {
    id: "STF-009",
    name: "Deepak Verma",
    role: "Waiter",
    phone: "+91 10987 65432",
    email: "deepak.v@spicekitchen.in",
    shift: "Evening",
    status: "Off Duty",
    rating: 4.2,
    joinDate: "Jan 2024",
    avatar: "DV",
    avatarColor: "from-teal-500 to-emerald-600",
  },
  {
    id: "STF-010",
    name: "Ananya Desai",
    role: "Chef",
    phone: "+91 09876 54321",
    email: "ananya.d@spicekitchen.in",
    shift: "Afternoon",
    status: "On Duty",
    rating: 4.8,
    joinDate: "Jul 2021",
    avatar: "AD",
    avatarColor: "from-indigo-500 to-violet-600",
  },
  {
    id: "STF-011",
    name: "Rohan Mehta",
    role: "Waiter",
    phone: "+91 98712 34560",
    email: "rohan.m@spicekitchen.in",
    shift: "Night",
    status: "On Duty",
    rating: 4.1,
    joinDate: "Oct 2023",
    avatar: "RM",
    avatarColor: "from-lime-500 to-green-600",
  },
  {
    id: "STF-012",
    name: "Nisha Agarwal",
    role: "Host",
    phone: "+91 87612 34509",
    email: "nisha.a@spicekitchen.in",
    shift: "Evening",
    status: "On Leave",
    rating: 4.6,
    joinDate: "May 2022",
    avatar: "NA",
    avatarColor: "from-cyan-500 to-sky-600",
  },
];

const statusStyles: Record<string, string> = {
  "On Duty": "bg-(--badge-success-bg) text-(--badge-success-text)",
  "Off Duty": "bg-secondary text-secondary-foreground",
  "On Leave": "bg-(--badge-warning-bg) text-(--badge-warning-text)",
};

const shiftStyles: Record<string, string> = {
  Morning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Afternoon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Evening: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Night: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

const roleStyles: Record<string, string> = {
  Chef: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Waiter: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Manager: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Host: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  Bartender: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Cashier: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

interface StaffTableProps {
  filterRole: StaffRole;
  searchQuery: string;
  onAddStaff?: () => void;
}

export default function StaffTable({
  filterRole,
  searchQuery,
  onAddStaff,
}: StaffTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = allStaff.filter((s) => {
    const matchesRole =
      filterRole === "all" || s.role.toLowerCase() === filterRole;
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery);
    return matchesRole && matchesSearch;
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
            Staff Directory
          </h3>
          <p className="text-sm text-muted-foreground">
            {filtered.length} staff members found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAddStaff}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95"
          >
            + Add Staff
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden divide-y divide-border">
        {paginated.map((s) => (
          <div key={s.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${s.avatarColor} text-xs font-bold text-white`}
                >
                  {s.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {s.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${roleStyles[s.role]}`}
                    >
                      {s.role}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {s.id}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[s.status]}`}
              >
                {s.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {s.phone}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {s.shift} shift
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-warning" />
                {s.rating}
              </span>
            </div>

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
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Staff
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shift
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((s) => (
              <tr
                key={s.id}
                className="group transition-colors hover:bg-secondary/50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${s.avatarColor} text-xs font-bold text-white`}
                    >
                      {s.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {s.name}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {s.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleStyles[s.role]}`}
                  >
                    {s.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-0.5">
                    <p className="flex items-center gap-1.5 text-sm text-foreground">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {s.phone}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {s.email}
                    </p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${shiftStyles[s.shift]}`}
                  >
                    <Clock className="h-3 w-3" />
                    {s.shift}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                    <span className="text-sm font-semibold text-foreground">
                      {s.rating}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm text-secondary-foreground">
                    {s.joinDate}
                  </span>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {paginated.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <UsersRound className="h-12 w-12 text-muted-foreground/40" />
          <h4 className="mt-4 text-base font-semibold text-foreground">
            No staff members found
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
            staff
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
