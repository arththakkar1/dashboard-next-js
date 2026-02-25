"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface AppShellContextValue {
  collapsed: boolean;
  mounted: boolean;
  mobileOpen: boolean;
  toggleCollapse: () => void;
  setMobileOpen: (open: boolean) => void;
  pageTitle: string;
  pageSubtitle: string;
  setPageMeta: (title: string, subtitle: string) => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error("useAppShell must be used within AppShellProvider");
  return ctx;
}

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Restaurant Dashboard");
  const [pageSubtitle, setPageSubtitle] = useState("Welcome back, Chef Arth");

  // Sync from localStorage AFTER hydration to avoid mismatch
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored === "true") setCollapsed(true);
    // Small delay so the DOM updates without transition
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar-collapsed", String(next));
      }
      return next;
    });
  }, []);

  const setPageMeta = useCallback((title: string, subtitle: string) => {
    setPageTitle(title);
    setPageSubtitle(subtitle);
  }, []);

  return (
    <AppShellContext.Provider
      value={{
        collapsed,
        mounted,
        mobileOpen,
        toggleCollapse,
        setMobileOpen,
        pageTitle,
        pageSubtitle,
        setPageMeta,
      }}
    >
      {children}
    </AppShellContext.Provider>
  );
}
