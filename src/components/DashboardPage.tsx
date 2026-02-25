"use client";

import StatsCards from "@/components/StatsCards";
import RevenueChart from "@/components/RevenueChart";
import TrafficChart from "@/components/TrafficChart";
import RecentOrders from "@/components/RecentOrders";
import ActivityFeed from "@/components/ActivityFeed";
import TopProducts from "@/components/TopProducts";
import TableReservations from "@/components/TableReservations";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function DashboardPage() {
  usePageMeta("Restaurant Dashboard", "Welcome back, Chef Arth");

  return (
    <div>
      {/* Stats Cards */}
      <section className="mb-6">
        <StatsCards />
      </section>

      {/* Charts Row */}
      <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueChart />
        <TrafficChart />
      </section>

      {/* Orders + Sidebar Row */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <RecentOrders />
          <TableReservations />
        </div>
        <div className="space-y-6">
          <ActivityFeed />
          <TopProducts />
        </div>
      </section>
    </div>
  );
}
