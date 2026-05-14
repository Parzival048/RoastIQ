"use client";

import { motion } from "framer-motion";
import { Flame, AlertTriangle, Info } from "lucide-react";
import type { RoastComment } from "@/types";

const severityConfig = {
  savage: {
    icon: Flame,
    label: "Savage",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/5",
    textColor: "text-red-400",
  },
  medium: {
    icon: AlertTriangle,
    label: "Medium",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/5",
    textColor: "text-orange-400",
  },
  mild: {
    icon: Info,
    label: "Mild",
    borderColor: "border-yellow-500/30",
    bgColor: "bg-yellow-500/5",
    textColor: "text-yellow-400",
  },
};

export function RoastCard({
  comment,
  index,
}: {
  comment: RoastComment;
  index: number;
}) {
  const config = severityConfig[comment.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`glass rounded-xl p-5 border ${config.borderColor} ${config.bgColor} hover:scale-[1.02] transition-transform`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
          {comment.category}
        </span>
        <div className={`flex items-center gap-1 ${config.textColor}`}>
          <Icon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-medium">{config.label}</span>
        </div>
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">
        &quot;{comment.comment}&quot;
      </p>
    </motion.div>
  );
}
