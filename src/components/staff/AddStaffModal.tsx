"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStaffModal({ isOpen, onClose }: AddStaffModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          <motion.div
            className="relative z-10 mx-4 w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Add New Staff
                </h2>
                <p className="text-sm text-muted-foreground">
                  Fill in the details to add a team member
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4 p-6">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Role & Shift */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Role
                  </label>
                  <select className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20">
                    <option value="">Select role</option>
                    <option value="Chef">Chef</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Manager">Manager</option>
                    <option value="Host">Host</option>
                    <option value="Bartender">Bartender</option>
                    <option value="Cashier">Cashier</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Shift
                  </label>
                  <select className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20">
                    <option value="">Select shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@spicekitchen.in"
                    className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Salary & Join Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Monthly Salary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 25,000"
                    className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Join Date
                  </label>
                  <input
                    type="date"
                    className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Address
                </label>
                <textarea
                  placeholder="Full address..."
                  rows={2}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-lg cursor-pointer border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
              <button className="rounded-lg cursor-pointer bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95">
                Add Staff Member
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
