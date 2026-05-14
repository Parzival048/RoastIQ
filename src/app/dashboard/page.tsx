import { DashboardView } from "@/components/dashboard/dashboard-view";
import { Navbar } from "@/components/shared/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — RoastIQ",
  description: "View your scan history, saved reports, and subscription details.",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <DashboardView />
      </main>
    </>
  );
}
