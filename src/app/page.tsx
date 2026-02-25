import type { Metadata } from "next";
import DashboardPage from "@/components/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Get a real-time overview of your restaurant — revenue, active orders, table occupancy, recent activity, and top-selling dishes at a glance.",
  keywords: [
    "restaurant dashboard",
    "revenue overview",
    "order tracking",
    "live stats",
  ],
  openGraph: {
    title: "Dashboard | Spice Kitchen",
    description:
      "Real-time overview of revenue, orders, tables, and activity for your Indian restaurant.",
  },
};

export default function Home() {
  return <DashboardPage />;
}
