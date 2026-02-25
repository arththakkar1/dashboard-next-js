"use client";

import { Search, Bell, Sun, Moon, ChevronDown, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function Header({
  title = "Restaurant Dashboard",
  subtitle = "Welcome back, Chef Arth",
  onMenuClick,
  showMenuButton = false,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 sm:px-6 backdrop-blur-md transition-colors">
      {/* Left: Hamburger + Page Title */}
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:scale-105 active:scale-95"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-foreground">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders, menu, tables..."
            className="h-10 w-72 rounded-xl border border-border bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:w-80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:scale-105 active:scale-95"
          title={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon className="h-4.5 w-4.5" />
          ) : (
            <Sun className="h-4.5 w-4.5" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger animate-pulse-dot" />
        </button>

        <div className="mx-2 h-8 w-px bg-border" />

        {/* User profile */}
        <button className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-secondary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary-dark text-sm font-bold text-white">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-foreground leading-tight">
              Arth Thakkar
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Manager
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
