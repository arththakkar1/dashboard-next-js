"use client";

import { useEffect } from "react";
import { useAppShell } from "@/components/AppShellProvider";

/**
 * Sets the page title and subtitle shown in the Header.
 * Call this at the top of each page component.
 */
export function usePageMeta(title: string, subtitle: string) {
  const { setPageMeta } = useAppShell();
  useEffect(() => {
    setPageMeta(title, subtitle);
  }, [title, subtitle, setPageMeta]);
}
