"use client";

import { motion } from "framer-motion";
import type { ScoreCategory } from "@/types";

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-green-400";
  if (score >= 60) return "bg-yellow-400";
  if (score >= 40) return "bg-orange-400";
  return "bg-red-400";
}

export function ScoreCard({
  score,
  index,
}: {
  score: ScoreCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass rounded-xl p-4 text-center group hover:border-roast/30 transition-colors"
    >
      <div className="text-2xl mb-2">{score.icon}</div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: index * 0.08 + 0.3 }}
        className={`text-3xl font-bold mb-1 ${getScoreColor(score.score)}`}
      >
        {score.score}
      </motion.div>
      <div className="text-xs font-medium mb-2 text-foreground/80">
        {score.name}
      </div>
      <div className="w-full bg-secondary rounded-full h-1.5 mb-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score.score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
          className={`rounded-full h-1.5 ${getScoreBarColor(score.score)}`}
        />
      </div>
      <p className="text-[10px] text-muted-foreground leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
        {score.description}
      </p>
    </motion.div>
  );
}
