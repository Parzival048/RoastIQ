"use client";

import type { AnalysisMode } from "@/types";

const modes: { value: AnalysisMode; label: string; icon: string; description: string }[] = [
  {
    value: "roast",
    label: "Roast",
    icon: "🔥",
    description: "Savage, witty feedback",
  },
  {
    value: "professional",
    label: "Professional",
    icon: "💼",
    description: "Serious UX analysis",
  },
  {
    value: "ecommerce",
    label: "E-Commerce",
    icon: "🛒",
    description: "Conversion & checkout",
  },
  {
    value: "gamer",
    label: "Gamer",
    icon: "🎮",
    description: "Gaming community sites",
  },
  {
    value: "indian-business",
    label: "Indian Business",
    icon: "🇮🇳",
    description: "Indian SMB analysis",
  },
];

export function ModeSelector({
  selected,
  onSelect,
}: {
  selected: AnalysisMode;
  onSelect: (mode: AnalysisMode) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => onSelect(mode.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
            selected === mode.value
              ? "glass border-roast/40 text-foreground"
              : "bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          }`}
        >
          <span>{mode.icon}</span>
          <span className="font-medium">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
