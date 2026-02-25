import type { Metadata } from "next";
import OrdersPage from "@/components/orders/OrdersPage";

export const metadata: Metadata = {
  title: "Orders",
  description:
    "Create, filter, search, and track all dine-in, takeaway, and delivery orders. View order status, payment details, and history.",
  keywords: [
    "order management",
    "restaurant orders",
    "dine-in",
    "takeaway",
    "delivery",
  ],
  openGraph: {
    title: "Orders | Spice Kitchen",
    description:
      "Manage and track all restaurant orders — dine-in, takeaway & delivery.",
  },
};

export default function Orders() {
  return <OrdersPage />;
}
