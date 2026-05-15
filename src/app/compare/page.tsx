import { CompareView } from "@/components/roast/compare-view";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Websites — RoastIQ",
  description: "Compare multiple websites side by side with AI-powered analysis.",
};

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <CompareView />
      </main>
      <Footer />
    </>
  );
}
