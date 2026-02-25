"use client";

import { useState } from "react";
import OrdersStats from "@/components/orders/OrdersStats";
import OrderFilters from "@/components/orders/OrderFilters";
import OrdersTable from "@/components/orders/OrdersTable";

type FilterTab = "all" | "dine-in" | "delivery" | "takeaway";

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 min-w-0">
      {/* Stats Cards */}
      <section>
        <OrdersStats />
      </section>

      {/* Filters */}
      <section>
        <OrderFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </section>

      {/* Orders Table */}
      <section>
        <OrdersTable filterType={activeFilter} searchQuery={searchQuery} />
      </section>
    </div>
  );
}
