"use client";

import { useState } from "react";
import {
  Star,
  Flame,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  MoreHorizontal,
  IndianRupee,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import type { MenuCategory } from "./MenuFilters";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: MenuCategory;
  image: string;
  imageColor: string;
  rating: number;
  reviews: number;
  isVeg: boolean;
  isSpicy: boolean;
  isBestSeller: boolean;
  status: "Available" | "Out of Stock" | "Low Stock";
  prepTime: string;
  orders: number;
}

const allItems: MenuItem[] = [
  {
    id: "M001",
    name: "Butter Chicken",
    description:
      "Tender chicken in rich, creamy tomato-butter gravy with kasuri methi",
    price: "₹420",
    category: "mains",
    image: "BC",
    imageColor: "from-orange-500 to-red-500",
    rating: 4.8,
    reviews: 342,
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    status: "Available",
    prepTime: "25 min",
    orders: 1248,
  },
  {
    id: "M002",
    name: "Paneer Tikka",
    description:
      "Marinated cottage cheese grilled in tandoor with bell peppers and onions",
    price: "₹320",
    category: "starters",
    image: "PT",
    imageColor: "from-amber-500 to-orange-500",
    rating: 4.7,
    reviews: 289,
    isVeg: true,
    isSpicy: true,
    isBestSeller: true,
    status: "Available",
    prepTime: "20 min",
    orders: 986,
  },
  {
    id: "M003",
    name: "Hyderabadi Biryani",
    description:
      "Fragrant basmati rice layered with spiced meat, saffron and caramelized onions",
    price: "₹380",
    category: "rice",
    image: "HB",
    imageColor: "from-yellow-500 to-amber-600",
    rating: 4.9,
    reviews: 512,
    isVeg: false,
    isSpicy: true,
    isBestSeller: true,
    status: "Available",
    prepTime: "35 min",
    orders: 1580,
  },
  {
    id: "M004",
    name: "Garlic Naan",
    description:
      "Soft leavened bread topped with garlic and fresh coriander from tandoor",
    price: "₹80",
    category: "breads",
    image: "GN",
    imageColor: "from-yellow-600 to-amber-700",
    rating: 4.5,
    reviews: 198,
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    status: "Available",
    prepTime: "8 min",
    orders: 2340,
  },
  {
    id: "M005",
    name: "Gulab Jamun",
    description:
      "Deep-fried milk dumplings soaked in rose-flavored sugar syrup",
    price: "₹180",
    category: "desserts",
    image: "GJ",
    imageColor: "from-rose-500 to-pink-600",
    rating: 4.6,
    reviews: 267,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    status: "Available",
    prepTime: "10 min",
    orders: 890,
  },
  {
    id: "M006",
    name: "Masala Chai",
    description:
      "Traditional Indian spiced tea with cardamom, ginger and cinnamon",
    price: "₹60",
    category: "beverages",
    image: "MC",
    imageColor: "from-amber-700 to-yellow-800",
    rating: 4.4,
    reviews: 156,
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    status: "Available",
    prepTime: "5 min",
    orders: 3200,
  },
  {
    id: "M007",
    name: "Dal Makhani",
    description:
      "Black lentils slow-cooked overnight with butter, cream and aromatic spices",
    price: "₹280",
    category: "mains",
    image: "DM",
    imageColor: "from-stone-600 to-stone-800",
    rating: 4.7,
    reviews: 301,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    status: "Available",
    prepTime: "30 min",
    orders: 1120,
  },
  {
    id: "M008",
    name: "Chicken Tikka",
    description:
      "Boneless chicken marinated in yogurt and spices, chargrilled in tandoor",
    price: "₹350",
    category: "starters",
    image: "CT",
    imageColor: "from-red-500 to-orange-600",
    rating: 4.6,
    reviews: 245,
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    status: "Available",
    prepTime: "20 min",
    orders: 780,
  },
  {
    id: "M009",
    name: "Mango Lassi",
    description:
      "Chilled yogurt-based drink blended with fresh Alphonso mango pulp",
    price: "₹120",
    category: "beverages",
    image: "ML",
    imageColor: "from-yellow-400 to-orange-400",
    rating: 4.8,
    reviews: 198,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    status: "Low Stock",
    prepTime: "5 min",
    orders: 1450,
  },
  {
    id: "M010",
    name: "Rogan Josh",
    description:
      "Aromatic Kashmiri lamb curry with slow-braised tender meat in rich gravy",
    price: "₹480",
    category: "mains",
    image: "RJ",
    imageColor: "from-red-600 to-rose-700",
    rating: 4.7,
    reviews: 176,
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    status: "Available",
    prepTime: "40 min",
    orders: 620,
  },
  {
    id: "M011",
    name: "Veg Biryani",
    description:
      "Fragrant basmati rice with seasonal vegetables, saffron and whole spices",
    price: "₹280",
    category: "rice",
    image: "VB",
    imageColor: "from-green-500 to-emerald-600",
    rating: 4.5,
    reviews: 210,
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    status: "Available",
    prepTime: "30 min",
    orders: 540,
  },
  {
    id: "M012",
    name: "Tandoori Roti",
    description:
      "Whole wheat flatbread baked in tandoor, lightly charred and smoky",
    price: "₹40",
    category: "breads",
    image: "TR",
    imageColor: "from-amber-600 to-yellow-700",
    rating: 4.3,
    reviews: 134,
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    status: "Available",
    prepTime: "6 min",
    orders: 4100,
  },
  {
    id: "M013",
    name: "Rasmalai",
    description:
      "Soft cottage cheese patties in chilled, saffron-infused sweetened milk",
    price: "₹200",
    category: "desserts",
    image: "RM",
    imageColor: "from-yellow-300 to-amber-400",
    rating: 4.8,
    reviews: 223,
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    status: "Available",
    prepTime: "10 min",
    orders: 760,
  },
  {
    id: "M014",
    name: "Samosa",
    description:
      "Crispy pastry stuffed with spiced potatoes, peas and cumin served with chutney",
    price: "₹80",
    originalPrice: "₹100",
    category: "starters",
    image: "SA",
    imageColor: "from-yellow-500 to-amber-500",
    rating: 4.4,
    reviews: 312,
    isVeg: true,
    isSpicy: true,
    isBestSeller: false,
    status: "Available",
    prepTime: "12 min",
    orders: 2100,
  },
  {
    id: "M015",
    name: "Fish Curry",
    description:
      "Fresh fish simmered in coconut-based curry with curry leaves and mustard",
    price: "₹440",
    category: "mains",
    image: "FC",
    imageColor: "from-cyan-500 to-blue-600",
    rating: 4.5,
    reviews: 142,
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    status: "Out of Stock",
    prepTime: "30 min",
    orders: 380,
  },
  {
    id: "M016",
    name: "Kulfi",
    description:
      "Traditional Indian frozen dessert with pistachios, cardamom and saffron",
    price: "₹140",
    category: "desserts",
    image: "KF",
    imageColor: "from-green-400 to-emerald-500",
    rating: 4.6,
    reviews: 189,
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    status: "Available",
    prepTime: "5 min",
    orders: 670,
  },
];

const statusStyles: Record<string, string> = {
  Available: "bg-(--badge-success-bg) text-(--badge-success-text)",
  "Out of Stock": "bg-(--badge-danger-bg) text-(--badge-danger-text)",
  "Low Stock": "bg-(--badge-warning-bg) text-(--badge-warning-text)",
};

interface MenuGridProps {
  category: MenuCategory;
  searchQuery: string;
  onAddItem?: () => void;
}

export default function MenuGrid({
  category,
  searchQuery,
  onAddItem,
}: MenuGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = allItems.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Menu Items
          </h3>
          <p className="text-sm text-muted-foreground">
            {filtered.length} items found
          </p>
        </div>
        <button
          onClick={onAddItem}
          className="flex items-center gap-1.5 self-start rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95"
        >
          + Add Item
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginated.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Image placeholder */}
            <div
              className={`relative flex h-40 items-center justify-center bg-linear-to-br ${item.imageColor}`}
            >
              <span className="text-3xl font-bold text-white/90">
                {item.image}
              </span>

              {/* Badges over image */}
              <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                {item.isBestSeller && (
                  <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    <TrendingUp className="h-3 w-3" />
                    Best Seller
                  </span>
                )}
                {item.isVeg ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                    <Leaf className="h-3 w-3" />
                    Veg
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                    Non-Veg
                  </span>
                )}
              </div>

              {item.isSpicy && (
                <div className="absolute right-3 top-3">
                  <span className="flex items-center gap-0.5 rounded-full bg-orange-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                    <Flame className="h-3 w-3" />
                    Spicy
                  </span>
                </div>
              )}

              {/* Hover actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
                  title="Edit Item"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
                  title="More"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {item.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-foreground">
                    {item.rating}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({item.reviews} reviews)
                </span>
                <span className="text-xs text-muted-foreground">
                  · {item.prepTime}
                </span>
              </div>

              {/* Price & orders */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    {item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.orders.toLocaleString()} orders
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {paginated.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-sm font-medium text-foreground">
            No items found
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > perPage && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Showing{" "}
            <span className="font-medium text-foreground">
              {(currentPage - 1) * perPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(currentPage * perPage, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            items
          </p>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
