"use client";

import { useState } from "react";
import MenuStats from "@/components/menu/MenuStats";
import MenuFilters, { type MenuCategory } from "@/components/menu/MenuFilters";
import MenuGrid from "@/components/menu/MenuGrid";
import AddItemModal from "@/components/menu/AddItemModal";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6 min-w-0">
      {/* Stats Cards */}
      <section>
        <MenuStats />
      </section>

      {/* Filters */}
      <section>
        <MenuFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </section>

      {/* Menu Grid */}
      <section>
        <MenuGrid
          category={activeCategory}
          searchQuery={searchQuery}
          onAddItem={() => setIsAddModalOpen(true)}
        />
      </section>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
