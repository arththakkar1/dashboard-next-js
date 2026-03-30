"use client";

import { Search, Bell, Sun, Moon, ChevronDown, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import SearchModal from "./SearchModal";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export default function Header({
  title = "Restaurant Dashboard",
  subtitle = "Welcome back, Chef Arth",
  onMenuClick,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [shortcutKey, setShortcutKey] = useState("⌘K");
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (
      navigator.userAgent.toLowerCase().includes("win") ||
      navigator.userAgent.toLowerCase().includes("linux")
    ) {
      setShortcutKey("Ctrl K");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b border-border bg-card/80 px-3 sm:px-6 backdrop-blur-md transition-colors">
      {/* Left: Hamburger + Page Title */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Hamburger -- visible only on mobile via CSS */}
        <button
          onClick={onMenuClick}
          className="flex md:hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:scale-105 active:scale-95"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base sm:text-xl font-bold text-foreground">
            {title}
          </h1>
          <p className="truncate text-[11px] sm:text-xs text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden lg:flex items-center">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="relative flex items-center h-10 w-72 cursor-pointer rounded-xl border border-border bg-secondary pl-10 pr-4 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <span className="text-muted-foreground">Search orders, menu, tables...</span>
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
            {shortcutKey}
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex  shrink-0 items-center gap-1 sm:gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="relative cursor-pointer flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:scale-105 active:scale-95"
          title={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          ) : (
            <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`relative cursor-pointer flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl transition-colors hover:bg-secondary hover:text-foreground ${
              isNotificationsOpen ? "bg-secondary text-foreground" : "text-muted-foreground"
            }`}
          >
            <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            <span className="absolute right-1 top-1 sm:right-1.5 sm:top-1.5 h-2 w-2 rounded-full bg-danger animate-pulse-dot" />
          </button>

          {/* Notification Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-xl border border-border bg-card shadow-lg z-50 overflow-hidden transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
              <div className="p-4 border-b border-border flex justify-between items-center bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                    3
                  </span>
                </div>
                <button 
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>
              
              <div className="max-h-[320px] overflow-y-auto">
                {/* Notification Item 1 */}
                <div className="p-4 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1 text-left min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight">New Order #4829</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">Table 4 has placed a new order for 2x Margherita Pizza and 2x Coke.</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-1">2 mins ago</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  </div>
                </div>

                {/* Notification Item 2 */}
                <div className="p-4 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1 text-left min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight">Low Inventory Alert</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">Tomatoes and Mozzarella Cheese are running low in stock. Please restock soon.</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-1">1 hour ago</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  </div>
                </div>

                {/* Notification Item 3 */}
                <div className="p-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1 text-left min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight">Payment Successful</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">Table 2 has paid their bill of $45.00 via Credit Card.</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-border bg-card/50 text-center">
                <button 
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block mx-2 h-8 w-px bg-border" />

        {/* User profile */}
        <button className="flex cursor-pointer items-center gap-2 rounded-xl px-1.5 py-1.5 sm:px-2 transition-colors hover:bg-secondary">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary-dark text-xs sm:text-sm font-bold text-white">
            A
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-foreground leading-tight">
              Arth Thakkar
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Manager
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden md:block" />
        </button>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
