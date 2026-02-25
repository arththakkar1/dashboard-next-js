"use client";

import { useState } from "react";
import StaffStats from "@/components/staff/StaffStats";
import StaffFilters from "@/components/staff/StaffFilters";
import StaffTable from "@/components/staff/StaffTable";
import AddStaffModal from "@/components/staff/AddStaffModal";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { StaffRole } from "@/components/staff/StaffFilters";

export default function StaffPage() {
  usePageMeta("Staff", "Manage your restaurant team");
  const [activeRole, setActiveRole] = useState<StaffRole>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  return (
    <div className="space-y-6 min-w-0">
      {/* Stats Cards */}
      <section>
        <StaffStats />
      </section>

      {/* Filters */}
      <section>
        <StaffFilters
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </section>

      {/* Staff Table */}
      <section>
        <StaffTable
          filterRole={activeRole}
          searchQuery={searchQuery}
          onAddStaff={() => setIsAddStaffOpen(true)}
        />
      </section>

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
      />
    </div>
  );
}
