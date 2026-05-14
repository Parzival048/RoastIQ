"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";

const comparisons = [
  {
    category: "Hero Section",
    before: "We are a platform that helps businesses do things better with solutions.",
    after: "Stop losing customers to bad design. Get AI-powered conversion insights in 30 seconds.",
    beforeIssues: ["Vague value prop", "No urgency", "Generic language"],
    afterWins: ["Clear benefit", "Time-specific CTA", "Problem-focused"],
  },
  {
    category: "Call to Action",
    before: "Submit",
    after: "Get Your Free Roast →",
    beforeIssues: ["Zero personality", "No value communicated", "Boring"],
    afterWins: ["Action-oriented", "Value-first", "Creates curiosity"],
  },
  {
    category: "Trust Signals",
    before: "No testimonials, no logos, no social proof anywhere on the page.",
    after: "\"RoastIQ increased our conversions by 340%\" — Sarah Chen, PixelPerfect + 50K+ websites analyzed",
    beforeIssues: ["No credibility", "Feels untrustworthy", "Anonymous"],
    afterWins: ["Named testimonial", "Specific metric", "Volume proof"],
  },
];

export function BeforeAfter() {
  return (
    <section className="relative py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Before vs After <span className="gradient-text">RoastIQ</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how our AI transforms conversion-killing copy into customer magnets.
          </p>
        </motion.div>

        <div className="space-y-8">
          {comparisons.map((comp, i) => (
            <motion.div
              key={comp.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="px-6 py-3 border-b border-border/50">
                <span className="text-sm font-semibold text-roast">
                  {comp.category}
                </span>
              </div>
              <div className="grid md:grid-cols-[1fr,auto,1fr]">
                {/* Before */}
                <div className="p-6 border-b md:border-b-0 md:border-r border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                      Before
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    &quot;{comp.before}&quot;
                  </p>
                  <div className="space-y-1.5">
                    {comp.beforeIssues.map((issue) => (
                      <div
                        key={issue}
                        className="flex items-center gap-2 text-xs text-red-400/80"
                      >
                        <X className="h-3 w-3 shrink-0" />
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center px-4">
                  <ArrowRight className="h-5 w-5 text-roast" />
                </div>

                {/* After */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
                      After
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-4 font-medium">
                    &quot;{comp.after}&quot;
                  </p>
                  <div className="space-y-1.5">
                    {comp.afterWins.map((win) => (
                      <div
                        key={win}
                        className="flex items-center gap-2 text-xs text-green-400/80"
                      >
                        <Check className="h-3 w-3 shrink-0" />
                        {win}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
