import AppShell from "@/components/AppShell";
import OrdersPage from "@/components/orders/OrdersPage";

export default function Orders() {
  return (
    <AppShell title="Orders" subtitle="Manage all restaurant orders">
      <OrdersPage />
    </AppShell>
  );
}
