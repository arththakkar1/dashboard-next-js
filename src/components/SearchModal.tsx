"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dummy results for visual structure
const MOCK_RESULTS = [
  { id: 1, title: "Order #1234 - John Doe", type: "Order", href: "/orders" },
  { id: 2, title: "Table 5 Reservation - 7:00 PM", type: "Reservation", href: "/reservations" },
  { id: 3, title: "Spicy Garlic Noodles", type: "Menu Item", href: "/menu" },
  { id: 4, title: "Staff Directory", type: "Staff", href: "/staff" },
  { id: 5, title: "Daily Revenue Report", type: "Analytics", href: "/analytics" },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(MOCK_RESULTS);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape to close handled generally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
        setResults(
          MOCK_RESULTS.filter((r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase())
          )
        );
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults(MOCK_RESULTS);
      setIsSearching(false);
    }
  }, [query]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm animate-fade-in" style={{ animationDuration: "0.2s" }}>
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
        aria-hidden="true"
      />
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl animate-fade-in"
        style={{ animationDuration: "0.2s" }}
        role="dialog"
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent px-3 py-1.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Search orders, menu, tables..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isSearching && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground mr-2" />}
          <kbd className="hidden sm:inline-flex items-center justify-center rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground cursor-pointer" onClick={onClose}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
          {results.length > 0 ? (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => {
                  router.push(result.href);
                  onClose();
                }}
                className="group cursor-pointer flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-secondary/50"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {result.title}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground bg-secondary group-hover:bg-primary/10 group-hover:text-primary px-2 py-0.5 rounded-full transition-colors">
                  {result.type}
                </span>
              </button>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">We couldn't find anything matching "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
