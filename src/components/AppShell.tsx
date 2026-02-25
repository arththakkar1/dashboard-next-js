"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AppShell({ children, title, subtitle }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile sidebar on route change or escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      {/* Mobile overlay backdrop */}
      {mobileOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — hidden off-screen on mobile, slides in when mobileOpen */}
      <div
        className={`
          fixed left-0 top-0 z-50 h-screen transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        <Sidebar
          collapsed={isMobile ? false : collapsed}
          onToggle={() => {
            if (isMobile) {
              setMobileOpen(false);
            } else {
              setCollapsed(!collapsed);
            }
          }}
        />
      </div>

      {/* Main content area */}
      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out ${
          isMobile ? "ml-0" : collapsed ? "ml-18" : "ml-65"
        }`}
      >
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen(!mobileOpen)}
          showMenuButton={isMobile}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
