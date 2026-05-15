"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Download,
  Copy,
  Check,
  Lightbulb,
  PenLine,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCard } from "./score-card";
import { RoastCard } from "./roast-card";
import type { AnalysisResult } from "@/types";

export function AnalysisResults({ result }: { result: AnalysisResult }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `🔥 RoastIQ Score: ${result.overallScore}/100\n\n${result.roastComments
      .map((c) => `${c.category}: "${c.comment}"`)
      .join("\n\n")}\n\nGet your website roasted at roastiq.ai`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `Just got my website roasted by @RoastIQ 🔥\n\nOverall Score: ${result.overallScore}/100\n\nGet yours at roastiq.ai`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 text-center max-w-2xl mx-auto"
      >
        <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-secondary"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 264" }}
              animate={{
                strokeDasharray: `${result.overallScore * 2.64} 264`,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.7 0.18 30)" />
                <stop offset="100%" stopColor="oklch(0.6 0.22 20)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold gradient-text"
            >
              {result.overallScore}
            </motion.span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {result.overallScore < 40
            ? "Your website needs serious help. But don't worry, that's why we're here."
            : result.overallScore < 70
              ? "Not bad, but there's significant room for improvement."
              : "Looking good! A few tweaks and you'll be crushing it."}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? (
              <Check className="mr-1.5 h-3.5 w-3.5" />
            ) : (
              <Copy className="mr-1.5 h-3.5 w-3.5" />
            )}
            {copied ? "Copied!" : "Copy Roast"}
          </Button>
          <Button size="sm" variant="outline" onClick={handleShare}>
            <Share2 className="mr-1.5 h-3.5 w-3.5" />
            Share on X
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              window.open(`/api/report?scanId=${result.id}`, "_blank");
            }}
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Scores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {result.scores.map((score, i) => (
          <ScoreCard key={score.name} score={score} index={i} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="roast" className="w-full">
        <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 bg-secondary/50">
          <TabsTrigger value="roast">Roast</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="redesign">Redesign</TabsTrigger>
          <TabsTrigger value="copy">Copy</TabsTrigger>
        </TabsList>

        <TabsContent value="roast" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.roastComments.map((comment, i) => (
              <RoastCard key={comment.category} comment={comment} index={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {result.professionalFeedback.map((feedback, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-roast/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-4 w-4 text-roast" />
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {feedback}
                </p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redesign" className="mt-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {result.redesignSuggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <ArrowRight className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {suggestion}
                </p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="copy" className="mt-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Hero Rewrite */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <PenLine className="h-4 w-4 text-roast" />
                <h3 className="text-sm font-semibold">Suggested Hero Copy</h3>
              </div>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                &quot;{result.heroRewrite}&quot;
              </p>
            </div>

            {/* CTA Suggestions */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-semibold mb-4">
                Better CTA Options
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.ctaSuggestions.map((cta) => (
                  <div
                    key={cta}
                    className="px-4 py-2 rounded-lg roast-gradient text-white text-sm font-medium"
                  >
                    {cta}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
