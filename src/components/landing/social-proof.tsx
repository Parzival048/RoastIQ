"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Websites Roasted" },
  { value: "94%", label: "Found Critical Issues" },
  { value: "3.4x", label: "Avg. Conversion Lift" },
  { value: "2M+", label: "Roasts Shared" },
];

const logos = [
  "TechCrunch",
  "ProductHunt",
  "Y Combinator",
  "Indie Hackers",
  "Hacker News",
];

export function SocialProof() {
  return (
    <section className="relative py-20 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by startups and agencies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm md:text-base font-semibold tracking-wide"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
