"use client";

import { motion } from "framer-motion";
import { Globe, Cpu, BarChart3, Share2 } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Paste Your URL",
    description: "Drop any website URL into our analyzer. No signup needed for your first scan.",
  },
  {
    icon: Cpu,
    title: "AI Analyzes Everything",
    description:
      "Our AI captures screenshots, analyzes visual hierarchy, trust signals, conversion flow, and UX patterns.",
  },
  {
    icon: BarChart3,
    title: "Get Your Score & Roast",
    description:
      "Receive detailed scores across 6 categories plus witty, brutally honest feedback on what's killing your conversions.",
  },
  {
    icon: Share2,
    title: "Share & Improve",
    description:
      "Share your roast on social media, download professional reports, and get actionable redesign suggestions.",
  },
];

export function HowItWorks() {
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
            How <span className="gradient-text">RoastIQ</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From URL to actionable insights in under 30 seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center group"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-border to-transparent" />
              )}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-4 group-hover:border-roast/30 transition-colors">
                <step.icon className="h-7 w-7 text-roast" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full roast-gradient text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
