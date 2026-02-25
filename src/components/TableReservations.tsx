"use client";

import { Clock, Users, CheckCircle2, XCircle } from "lucide-react";

const reservations = [
  {
    id: "RSV-101",
    guest: "Ananya Desai",
    guests: 4,
    table: "Table 3",
    time: "7:00 PM",
    status: "Confirmed",
    note: "Birthday celebration",
  },
  {
    id: "RSV-102",
    guest: "Rohan Mehta",
    guests: 2,
    table: "Table 7",
    time: "7:30 PM",
    status: "Confirmed",
    note: "Window seat preferred",
  },
  {
    id: "RSV-103",
    guest: "Kavita Iyer",
    guests: 6,
    table: "Table 1",
    time: "8:00 PM",
    status: "Pending",
    note: "Family dinner, high chair needed",
  },
  {
    id: "RSV-104",
    guest: "Suresh Nair",
    guests: 3,
    table: "Table 10",
    time: "8:30 PM",
    status: "Cancelled",
    note: "",
  },
  {
    id: "RSV-105",
    guest: "Deepa Joshi",
    guests: 8,
    table: "Table 2",
    time: "9:00 PM",
    status: "Confirmed",
    note: "Anniversary, cake arrangement",
  },
];

const statusConfig: Record<
  string,
  { icon: typeof CheckCircle2; style: string }
> = {
  Confirmed: {
    icon: CheckCircle2,
    style: "bg-(--badge-success-bg) text-(--badge-success-text)",
  },
  Pending: {
    icon: Clock,
    style: "bg-(--badge-warning-bg) text-(--badge-warning-text)",
  },
  Cancelled: {
    icon: XCircle,
    style: "bg-(--badge-danger-bg) text-(--badge-danger-text)",
  },
};

export default function TableReservations() {
  return (
    <div className="animate-fade-in stagger-6 rounded-2xl border border-border bg-card shadow-sm transition-colors">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Upcoming Reservations
          </h3>
          <p className="text-sm text-muted-foreground">
            Tonight&apos;s bookings
          </p>
        </div>
        <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          {reservations.filter((r) => r.status === "Confirmed").length}{" "}
          confirmed
        </span>
      </div>

      <div className="divide-y divide-border">
        {reservations.map((reservation) => {
          const status = statusConfig[reservation.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={reservation.id}
              className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-secondary/50"
            >
              {/* Time */}
              <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-secondary">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="mt-0.5 text-[10px] font-bold text-foreground leading-none">
                  {reservation.time.replace(" PM", "").replace(" AM", "")}
                </span>
              </div>

              {/* Guest info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {reservation.guest}
                  </p>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {reservation.id}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {reservation.guests} guests
                  </span>
                  <span>{reservation.table}</span>
                  {reservation.note && (
                    <span className="truncate italic">{reservation.note}</span>
                  )}
                </div>
              </div>

              {/* Status */}
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.style}`}
              >
                <StatusIcon className="h-3 w-3" />
                {reservation.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
