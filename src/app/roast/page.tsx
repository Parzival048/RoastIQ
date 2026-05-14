import { Suspense } from "react";
import { RoastAnalyzer } from "@/components/roast/roast-analyzer";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze Your Website — RoastIQ",
  description:
    "Get your website roasted by AI. Instant analysis of trust, design, conversion, and UX.",
};

export default function RoastPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-muted-foreground">Loading analyzer...</div>
            </div>
          }
        >
          <RoastAnalyzer />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
