"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  BookOpen,
  BarChart3,
  UsersRound,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ClipboardList, label: "Orders", href: "/orders" },
  { icon: BookOpen, label: "Menu", href: "/menu" },
  { icon: UtensilsCrossed, label: "Reservations", href: "/reservations" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: UsersRound, label: "Staff", href: "/staff" },
];

const bottomNavItems = [
  { icon: HelpCircle, label: "Help Center" },
  { icon: LogOut, label: "Log Out" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose?: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-full flex-col backdrop-blur-xl border-r border-black/5 dark:border-white/10 transition-all duration-300 ${
        collapsed ? "w-18" : "w-65"
      }`}
      style={{ backgroundColor: "var(--sidebar-bg-translucent)" }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-black/5 px-5 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/25">
            <Flame className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-black dark:text-white">
              Spice Kitchen
            </span>
          )}
        </div>
        {/* Close button — visible only on mobile */}
        <button
          onClick={onMobileClose}
          className="flex md:hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5 dark:hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-sidebar-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5 dark:hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-sidebar-foreground group-hover:text-foreground dark:group-hover:text-white"
                    }`}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-black/5 px-3 py-4 dark:border-white/10">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.label}>
              <button
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5 dark:hover:text-white ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0 text-sidebar-foreground group-hover:text-foreground dark:group-hover:text-white" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Collapse toggle — hidden on mobile */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 hidden md:flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-all hover:bg-secondary hover:text-foreground hover:scale-110"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
}
