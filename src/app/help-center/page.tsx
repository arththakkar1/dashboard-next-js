import type { Metadata } from "next";
import HelpCenterPage from "@/components/help-center/HelpCenterPage";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Search FAQs, browse tutorials, and contact support. Get answers on orders, menu, reservations, analytics, staff, and account settings.",
  keywords: ["help center", "FAQ", "support", "tutorials", "contact us"],
  openGraph: {
    title: "Help Center | Spice Kitchen",
    description:
      "Find answers, browse tutorials & contact support for the Spice Kitchen dashboard.",
  },
};

export default function HelpCenter() {
  return <HelpCenterPage />;
}
