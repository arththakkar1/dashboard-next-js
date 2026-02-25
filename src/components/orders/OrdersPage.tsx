"use client";

import { useState } from "react";
import OrdersStats from "@/components/orders/OrdersStats";
import OrderFilters from "@/components/orders/OrderFilters";
import OrdersTable from "@/components/orders/OrdersTable";
import NewOrderModal from "@/components/orders/NewOrderModal";
import { usePageMeta } from "@/hooks/usePageMeta";

type FilterTab = "all" | "dine-in" | "delivery" | "takeaway";

export default function OrdersPage() {
  usePageMeta("Orders", "Manage all restaurant orders");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

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
        <OrdersTable
          filterType={activeFilter}
          searchQuery={searchQuery}
          onNewOrder={() => setIsNewOrderOpen(true)}
        />
      </section>

      {/* New Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
      />
    </div>
  );
}
