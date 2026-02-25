"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Users,
  CalendarDays,
  Clock,
  Armchair,
  Phone,
  User,
  MessageSquare,
  PartyPopper,
} from "lucide-react";

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const occasions = [
  "None",
  "Birthday",
  "Anniversary",
  "Date Night",
  "Corporate",
  "Family Gathering",
  "Other",
];

const timeSlots = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
];

export default function NewReservationModal({
  isOpen,
  onClose,
}: NewReservationModalProps) {
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [table, setTable] = useState("");
  const [occasion, setOccasion] = useState("None");
  const [notes, setNotes] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetForm = () => {
    setGuestName("");
    setPhone("");
    setGuestCount("2");
    setDate("");
    setTime("");
    setTable("");
    setOccasion("None");
    setNotes("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center sm:items-center">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        style={{ animationDuration: "0.15s" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 mt-4 sm:mt-0 w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl animate-fade-in [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              New Reservation
            </h2>
            <p className="text-xs text-muted-foreground">
              Book a table for your guest
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Guest Name + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="rsv-guest"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Guest Name <span className="text-danger">*</span>
                </span>
              </label>
              <input
                id="rsv-guest"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Ananya Desai"
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label
                htmlFor="rsv-phone"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Phone Number <span className="text-danger">*</span>
                </span>
              </label>
              <input
                id="rsv-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="rsv-date"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                  Date <span className="text-danger">*</span>
                </span>
              </label>
              <input
                id="rsv-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label
                htmlFor="rsv-time"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  Time Slot <span className="text-danger">*</span>
                </span>
              </label>
              <select
                id="rsv-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guests + Table */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="rsv-guests"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  Number of Guests <span className="text-danger">*</span>
                </span>
              </label>
              <input
                id="rsv-guests"
                type="number"
                min="1"
                max="20"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label
                htmlFor="rsv-table"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <Armchair className="h-3.5 w-3.5 text-muted-foreground" />
                  Table <span className="text-danger">*</span>
                </span>
              </label>
              <select
                id="rsv-table"
                value={table}
                onChange={(e) => setTable(e.target.value)}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              >
                <option value="">Select a table</option>
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={`Table ${i + 1}`}>
                    Table {i + 1} (
                    {i < 6
                      ? "2 seats"
                      : i < 12
                        ? "4 seats"
                        : i < 16
                          ? "6 seats"
                          : "8 seats"}
                    )
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Occasion */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              <span className="flex items-center gap-1.5">
                <PartyPopper className="h-3.5 w-3.5 text-muted-foreground" />
                Occasion
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setOccasion(occ)}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                    occasion === occ
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label
              htmlFor="rsv-notes"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              <span className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                Special Requests
              </span>
            </label>
            <textarea
              id="rsv-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or dietary requirements..."
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all resize-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Summary preview */}
          {guestName && date && time && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">
                Reservation Preview
              </h4>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span className="text-muted-foreground">Guest</span>
                <span className="text-foreground font-medium">{guestName}</span>
                <span className="text-muted-foreground">Date & Time</span>
                <span className="text-foreground font-medium">
                  {date} at {time}
                </span>
                <span className="text-muted-foreground">Party Size</span>
                <span className="text-foreground font-medium">
                  {guestCount} guest{Number(guestCount) !== 1 ? "s" : ""}
                </span>
                {table && (
                  <>
                    <span className="text-muted-foreground">Table</span>
                    <span className="text-foreground font-medium">{table}</span>
                  </>
                )}
                {occasion !== "None" && (
                  <>
                    <span className="text-muted-foreground">Occasion</span>
                    <span className="text-foreground font-medium">
                      {occasion}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
