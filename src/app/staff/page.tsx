import type { Metadata } from "next";
import StaffPage from "@/components/staff/StaffPage";

export const metadata: Metadata = {
  title: "Staff",
  description:
    "Manage your restaurant team — view the staff directory, track on-duty status, assign roles, and add or deactivate team members.",
  keywords: [
    "staff management",
    "restaurant team",
    "employee directory",
    "role assignment",
  ],
  openGraph: {
    title: "Staff | Spice Kitchen",
    description:
      "Manage your restaurant team — directory, roles, schedules & performance.",
  },
};

export default function Staff() {
  return <StaffPage />;
}
