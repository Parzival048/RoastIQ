import { Navbar } from "@/components/shared/navbar";
import { AdminPanel } from "@/components/admin/admin-panel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — RoastIQ",
  description: "Manage users, scans, and featured roasts.",
};

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <AdminPanel />
      </main>
    </>
  );
}
