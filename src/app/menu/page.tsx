import type { Metadata } from "next";
import MenuPage from "@/components/menu/MenuPage";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse, add, edit, and organize your Indian restaurant menu — starters, main course, biryani, breads, desserts, and beverages.",
  keywords: [
    "restaurant menu",
    "Indian food menu",
    "menu management",
    "dish categories",
  ],
  openGraph: {
    title: "Menu | Spice Kitchen",
    description:
      "Manage your full Indian restaurant menu — categories, pricing, availability & more.",
  },
};

export default function Menu() {
  return <MenuPage />;
}
