"use client";

import { Search } from "lucide-react";

export type StaffRole =
  | "all"
  | "chef"
  | "waiter"
  | "manager"
  | "host"
  | "bartender"
  | "cashier";

const roles: { value: StaffRole; label: string }[] = [
  { value: "all", label: "All Roles" },
  { value: "chef", label: "Chef" },
  { value: "waiter", label: "Waiter" },
  { value: "manager", label: "Manager" },
  { value: "host", label: "Host" },
  { value: "bartender", label: "Bartender" },
  { value: "cashier", label: "Cashier" },
];

interface StaffFiltersProps {
  activeRole: StaffRole;
  onRoleChange: (role: StaffRole) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function StaffFilters({
  activeRole,
  onRoleChange,
  searchQuery,
  onSearchChange,
}: StaffFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Role pills */}
      <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => onRoleChange(role.value)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeRole === role.value
                ? "bg-primary text-white"
                : "bg-card border border-border text-secondary-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative shrink-0">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search staff..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20 sm:w-64"
        />
      </div>
    </div>
  );
}
