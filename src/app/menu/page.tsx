import AppShell from "@/components/AppShell";
import MenuPage from "@/components/menu/MenuPage";

export default function Menu() {
  return (
    <AppShell title="Menu" subtitle="Manage your restaurant menu">
      <MenuPage />
    </AppShell>
  );
}
