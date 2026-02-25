"use client";

import { usePageMeta } from "@/hooks/usePageMeta";
import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import RevenueAnalyticsChart from "@/components/analytics/RevenueAnalyticsChart";
import OrdersBreakdownChart from "@/components/analytics/OrdersBreakdownChart";
import PeakHoursChart from "@/components/analytics/PeakHoursChart";
import CategoryPerformanceChart from "@/components/analytics/CategoryPerformanceChart";
import CustomerInsightsChart from "@/components/analytics/CustomerInsightsChart";
import WeeklyComparisonChart from "@/components/analytics/WeeklyComparisonChart";
import TopSellingItems from "@/components/analytics/TopSellingItems";
import DailySummary from "@/components/analytics/DailySummary";

export default function AnalyticsPage() {
  usePageMeta("Analytics", "Revenue, orders & customer insights");

  return (
    <div className="space-y-6 min-w-0">
      {/* KPI Stats */}
      <section>
        <AnalyticsStats />
      </section>

      {/* Revenue + Orders Breakdown */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueAnalyticsChart />
        </div>
        <div>
          <OrdersBreakdownChart />
        </div>
      </section>

      {/* Peak Hours + Weekly Comparison */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PeakHoursChart />
        <WeeklyComparisonChart />
      </section>

      {/* Customer Insights + Category Performance */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerInsightsChart />
        <CategoryPerformanceChart />
      </section>

      {/* Top Selling Items + Daily Summary */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TopSellingItems />
        </div>
        <div>
          <DailySummary />
        </div>
      </section>
    </div>
  );
}
