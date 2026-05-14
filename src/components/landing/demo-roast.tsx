"use client";

import { motion } from "framer-motion";
import { DEMO_ROAST } from "@/lib/constants";
import { ScoreCard } from "@/components/roast/score-card";
import { RoastCard } from "@/components/roast/roast-card";

export function DemoRoast() {
  return (
    <section id="demo" className="relative py-24">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-roast-glow/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See a <span className="gradient-text">Demo Roast</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here&apos;s what happens when we analyze a website. Brutal honesty meets
            actionable intelligence.
          </p>
        </motion.div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {DEMO_ROAST.scores.map((score, i) => (
            <ScoreCard key={score.name} score={score} index={i} />
          ))}
        </div>

        {/* Roast Comments */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_ROAST.roastComments.slice(0, 3).map((comment, i) => (
            <RoastCard key={comment.category} comment={comment} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
