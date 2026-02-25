"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  UtensilsCrossed,
  Truck,
  ShoppingBag,
  Plus,
  Minus,
  Search,
} from "lucide-react";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OrderType = "dine-in" | "delivery" | "takeaway";

const popularItems = [
  { id: 1, name: "Butter Chicken", price: 420, category: "Main Course" },
  { id: 2, name: "Garlic Naan", price: 80, category: "Breads" },
  { id: 3, name: "Paneer Tikka", price: 320, category: "Starters" },
  { id: 4, name: "Hyderabadi Biryani", price: 380, category: "Rice" },
  { id: 5, name: "Dal Makhani", price: 280, category: "Main Course" },
  { id: 6, name: "Tandoori Roti", price: 40, category: "Breads" },
  { id: 7, name: "Mango Lassi", price: 120, category: "Beverages" },
  { id: 8, name: "Gulab Jamun", price: 180, category: "Desserts" },
  { id: 9, name: "Masala Chai", price: 60, category: "Beverages" },
  { id: 10, name: "Raita", price: 80, category: "Sides" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [table, setTable] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const overlayRef = useRef<HTMLDivElement>(null);

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

  const addItem = (item: (typeof popularItems)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, qty: 1 },
      ];
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.qty > 1) {
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
      }
      return prev.filter((c) => c.id !== id);
    });
  };

  const getQty = (id: number) => cart.find((c) => c.id === id)?.qty ?? 0;

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const filteredItems = popularItems.filter(
    (item) =>
      itemSearch === "" ||
      item.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(itemSearch.toLowerCase()),
  );

  const resetForm = () => {
    setOrderType("dine-in");
    setCustomerName("");
    setPhone("");
    setTable("");
    setAddress("");
    setNotes("");
    setItemSearch("");
    setCart([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    resetForm();
  };

  const typeOptions: {
    value: OrderType;
    label: string;
    icon: typeof UtensilsCrossed;
  }[] = [
    { value: "dine-in", label: "Dine-in", icon: UtensilsCrossed },
    { value: "delivery", label: "Delivery", icon: Truck },
    { value: "takeaway", label: "Takeaway", icon: ShoppingBag },
  ];

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
      <div className="relative z-10 mx-4 mt-4 sm:mt-0 w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl animate-fade-in [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-foreground">New Order</h2>
            <p className="text-xs text-muted-foreground">
              Create a new restaurant order
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
          {/* Order Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Order Type <span className="text-danger">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {typeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setOrderType(opt.value)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      orderType === opt.value
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border bg-background text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="order-customer"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Customer Name <span className="text-danger">*</span>
              </label>
              <input
                id="order-customer"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label
                htmlFor="order-phone"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Phone Number
              </label>
              <input
                id="order-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Conditional: Table or Address */}
          {orderType === "dine-in" && (
            <div>
              <label
                htmlFor="order-table"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Table Number <span className="text-danger">*</span>
              </label>
              <select
                id="order-table"
                value={table}
                onChange={(e) => setTable(e.target.value)}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              >
                <option value="">Select a table</option>
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={`Table ${i + 1}`}>
                    Table {i + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {orderType === "delivery" && (
            <div>
              <label
                htmlFor="order-address"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Delivery Address <span className="text-danger">*</span>
              </label>
              <textarea
                id="order-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full delivery address..."
                rows={2}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all resize-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}

          {/* Add Items */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Order Items <span className="text-danger">*</span>
            </label>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
                placeholder="Search menu items..."
                className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Item Grid */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 max-h-48 overflow-y-auto rounded-xl border border-border bg-secondary/30 p-2">
              {filteredItems.map((item) => {
                const qty = getQty(item.id);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                      qty > 0
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-card border border-border hover:bg-secondary"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{item.price} · {item.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {qty > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-foreground transition-colors hover:bg-danger/20 hover:text-danger"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-foreground">
                            {qty}
                          </span>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                Order Summary
              </h4>
              <div className="space-y-1.5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-secondary-foreground">
                      {item.name} x{item.qty}
                    </span>
                    <span className="font-medium text-foreground">
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-2 mt-2 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">GST (5%)</span>
                  <span className="text-foreground">₹{tax}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary text-base">₹{total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label
              htmlFor="order-notes"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Special Instructions
            </label>
            <textarea
              id="order-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or dietary notes..."
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all resize-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
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
              disabled={cart.length === 0}
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Place Order {total > 0 && `· ₹${total}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
