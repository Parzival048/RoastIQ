"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-24 border-t border-border/50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-roast-glow/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Out Why
            <br />
            <span className="gradient-text">Your Website is Losing Customers?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join 50,000+ websites that have been roasted. Get your brutally honest
            analysis in seconds. No signup required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#analyze"
              className={cn(
                buttonVariants({ size: "lg" }),
                "roast-gradient text-white border-0 hover:opacity-90 h-14 px-8 text-lg"
              )}
            >
              Roast My Website
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#demo"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-14 px-8 text-lg"
              )}
            >
              View Demo Roast
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
