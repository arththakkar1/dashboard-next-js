import AppShell from "@/components/AppShell";
import ReservationsPage from "@/components/reservations/ReservationsPage";

export default function Reservations() {
  return (
    <AppShell
      title="Reservations"
      subtitle="Manage table bookings and guest reservations"
    >
      <ReservationsPage />
    </AppShell>
  );
}
