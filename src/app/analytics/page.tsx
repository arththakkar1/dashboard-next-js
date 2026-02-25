import type { Metadata } from "next";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "Deep-dive into revenue trends, order breakdowns, peak hours, category performance, customer insights, and weekly comparisons.",
  keywords: [
    "restaurant analytics",
    "revenue trends",
    "sales insights",
    "peak hours",
    "performance reports",
  ],
  openGraph: {
    title: "Analytics | Spice Kitchen",
    description:
      "Revenue trends, order insights, peak hours & performance analytics for your restaurant.",
  },
};

export default function Analytics() {
  return <AnalyticsPage />;
}
