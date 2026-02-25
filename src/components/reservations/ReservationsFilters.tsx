"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export type ReservationStatus =
  | "all"
  | "confirmed"
  | "pending"
  | "cancelled"
  | "completed";

interface ReservationsFiltersProps {
  activeFilter: ReservationStatus;
  onFilterChange: (filter: ReservationStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const tabs: { label: string; value: ReservationStatus; count: number }[] = [
  { label: "All", value: "all", count: 284 },
  { label: "Confirmed", value: "confirmed", count: 196 },
  { label: "Pending", value: "pending", count: 42 },
  { label: "Completed", value: "completed", count: 0 },
  { label: "Cancelled", value: "cancelled", count: 46 },
];

export default function ReservationsFilters({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: ReservationsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Filter Tabs */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-1 rounded-xl bg-secondary p-1 w-max min-w-full sm:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onFilterChange(tab.value)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm sm:px-4 font-medium whitespace-nowrap transition-all duration-200 ${
                activeFilter === tab.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeFilter === tab.value
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 lg:flex-none">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reservations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full lg:w-64 rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>
    </div>
  );
}
