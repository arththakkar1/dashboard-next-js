"use client";

import { useState } from "react";
import ReservationsStats from "@/components/reservations/ReservationsStats";
import ReservationsFilters, {
  type ReservationStatus,
} from "@/components/reservations/ReservationsFilters";
import ReservationsTable from "@/components/reservations/ReservationsTable";
import NewReservationModal from "@/components/reservations/NewReservationModal";

export default function ReservationsPage() {
  const [activeFilter, setActiveFilter] = useState<ReservationStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  return (
    <div className="space-y-6 min-w-0">
      {/* Stats Cards */}
      <section>
        <ReservationsStats />
      </section>

      {/* Filters */}
      <section>
        <ReservationsFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </section>

      {/* Reservations Table */}
      <section>
        <ReservationsTable
          filterStatus={activeFilter}
          searchQuery={searchQuery}
          onNewReservation={() => setIsNewModalOpen(true)}
        />
      </section>

      {/* New Reservation Modal */}
      <NewReservationModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />
    </div>
  );
}
