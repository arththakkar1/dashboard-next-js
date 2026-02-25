"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload, Flame, Leaf, IndianRupee } from "lucide-react";
import type { MenuCategory } from "./MenuFilters";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: { label: string; value: MenuCategory }[] = [
  { label: "Starters", value: "starters" },
  { label: "Main Course", value: "mains" },
  { label: "Breads", value: "breads" },
  { label: "Rice & Biryani", value: "rice" },
  { label: "Desserts", value: "desserts" },
  { label: "Beverages", value: "beverages" },
];

export default function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<MenuCategory>("starters");
  const [prepTime, setPrepTime] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [isSpicy, setIsSpicy] = useState(false);
  const [status, setStatus] = useState<"Available" | "Out of Stock">(
    "Available",
  );

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would POST to an API
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("starters");
    setPrepTime("");
    setIsVeg(true);
    setIsSpicy(false);
    setStatus("Available");
  };

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center sm:items-center">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        style={{ animationDuration: "0.15s" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 mt-4 sm:mt-0 w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Add New Menu Item
            </h2>
            <p className="text-xs text-muted-foreground">
              Fill in the details for the new dish
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Upload Placeholder */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Item Image
            </label>
            <div className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 transition-colors hover:border-primary/50 hover:bg-secondary">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-[10px] text-muted-foreground">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="item-name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Item Name <span className="text-danger">*</span>
            </label>
            <input
              id="item-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Butter Chicken"
              required
              className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="item-desc"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Description
            </label>
            <textarea
              id="item-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the dish..."
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all resize-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Price + Prep Time row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="item-price"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Price <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ₹
                </span>
                <input
                  id="item-price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="420"
                  required
                  className="h-10 w-full rounded-xl border border-border bg-background pl-8 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="item-prep"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Prep Time
              </label>
              <input
                id="item-prep"
                type="text"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="e.g. 25 min"
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="item-category"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Category <span className="text-danger">*</span>
            </label>
            <select
              id="item-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as MenuCategory)}
              className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Availability
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStatus("Available")}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  status === "Available"
                    ? "border-success bg-success/10 text-success"
                    : "border-border bg-background text-muted-foreground hover:border-border hover:bg-secondary"
                }`}
              >
                Available
              </button>
              <button
                type="button"
                onClick={() => setStatus("Out of Stock")}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  status === "Out of Stock"
                    ? "border-danger bg-danger/10 text-danger"
                    : "border-border bg-background text-muted-foreground hover:border-border hover:bg-secondary"
                }`}
              >
                Out of Stock
              </button>
            </div>
          </div>

          {/* Tags row */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {/* Veg / Non-Veg */}
              <button
                type="button"
                onClick={() => setIsVeg(!isVeg)}
                className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                  isVeg
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {isVeg ? (
                  <>
                    <Leaf className="h-4 w-4" />
                    Veg
                  </>
                ) : (
                  <>
                    <span className="h-4 w-4 flex items-center justify-center text-xs font-bold">
                      NV
                    </span>
                    Non-Veg
                  </>
                )}
              </button>

              {/* Spicy */}
              <button
                type="button"
                onClick={() => setIsSpicy(!isSpicy)}
                className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                  isSpicy
                    ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                    : "border-border bg-background text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Flame className="h-4 w-4" />
                Spicy
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
