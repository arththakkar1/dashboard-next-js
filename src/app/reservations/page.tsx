import type { Metadata } from "next";
import ReservationsPage from "@/components/reservations/ReservationsPage";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "View, create, and manage table reservations. Track booking status, party size, seating assignments, and prevent double-booking.",
  keywords: [
    "table reservation",
    "restaurant booking",
    "seating management",
    "party booking",
  ],
  openGraph: {
    title: "Reservations | Spice Kitchen",
    description:
      "Manage table reservations, bookings & seating assignments for your restaurant.",
  },
};

export default function Reservations() {
  return <ReservationsPage />;
}
