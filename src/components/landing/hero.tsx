"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`glass rounded-xl p-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/roast?url=${encodeURIComponent(url.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-roast-glow rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-roast-glow rounded-full blur-3xl animate-glow-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-roast-glow/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-roast/30 bg-roast/10 px-4 py-1.5 text-sm text-roast mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Website Intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Your Website Might Be{" "}
              <span className="gradient-text">Losing Customers.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              RoastIQ analyzes your website&apos;s trust, design, conversion
              psychology, and user experience in seconds.
            </motion.p>

            {/* URL Input */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleAnalyze}
              id="analyze"
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0"
            >
              <Input
                type="url"
                placeholder="Enter your website URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="lg"
                className="roast-gradient text-white border-0 hover:opacity-90 h-12 px-6 whitespace-nowrap"
              >
                Roast My Website
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-roast" />
                30-second analysis
              </span>
              <span>No signup required</span>
            </motion.div>
          </div>

          {/* Right column - floating cards */}
          <div className="hidden lg:block relative h-[500px]">
            <FloatingCard
              className="absolute top-0 right-0 w-72 animate-float"
              delay={0.4}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs font-medium text-red-400">Trust Score: 35/100</span>
              </div>
              <p className="text-xs text-muted-foreground">
                &quot;Your website whispers &apos;I might be a scam&apos; to every visitor.&quot;
              </p>
            </FloatingCard>

            <FloatingCard
              className="absolute top-32 left-0 w-64 animate-float [animation-delay:1s]"
              delay={0.6}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-roast" />
                <span className="text-xs font-medium">Conversion Alert</span>
              </div>
              <p className="text-xs text-muted-foreground">
                &quot;This CTA is hiding like it owes taxes.&quot;
              </p>
            </FloatingCard>

            <FloatingCard
              className="absolute bottom-20 right-8 w-80 animate-float [animation-delay:2s]"
              delay={0.8}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium">Overall Score</span>
                <span className="text-2xl font-bold text-roast">42</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="roast-gradient rounded-full h-2"
                  style={{ width: "42%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your website needs immediate attention.
              </p>
            </FloatingCard>

            <FloatingCard
              className="absolute bottom-48 left-8 w-56 animate-float [animation-delay:3s]"
              delay={1.0}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🎨</span>
                <div>
                  <p className="text-xs font-medium">Design Score</p>
                  <p className="text-xs text-muted-foreground">28/100 — &quot;Ouch.&quot;</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
