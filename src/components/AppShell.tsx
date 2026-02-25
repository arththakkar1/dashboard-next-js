"use client";

import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAppShell } from "@/components/AppShellProvider";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const {
    collapsed,
    mounted,
    mobileOpen,
    toggleCollapse,
    setMobileOpen,
    pageTitle,
    pageSubtitle,
  } = useAppShell();

  // Close mobile sidebar on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setMobileOpen]);

  // Transition classes — disabled until mounted to prevent flash
  const transitionClass = mounted
    ? "transition-all duration-300 ease-in-out"
    : "";

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 z-50 h-screen ${mounted ? "transition-transform duration-300 ease-in-out" : ""}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar
          collapsed={collapsed}
          onToggle={toggleCollapse}
          onMobileClose={() => setMobileOpen(false)}
          suppressTransition={!mounted}
        />
      </div>

      {/* Main content area */}
      <div
        className={`flex min-w-0 flex-1 flex-col ${transitionClass} ml-0 ${
          collapsed ? "md:ml-18" : "md:ml-65"
        }`}
      >
        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
          onMenuClick={() => setMobileOpen(!mobileOpen)}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
