"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnalysisResults } from "./analysis-results";
import { ModeSelector } from "./mode-selector";
import type { AnalysisMode, AnalysisResult } from "@/types";

type AnalysisState = "idle" | "analyzing" | "complete" | "error";

export function RoastAnalyzer() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get("url") || "";

  const [url, setUrl] = useState(initialUrl);
  const [mode, setMode] = useState<AnalysisMode>("roast");
  const [state, setState] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url.trim()) return;

      setState("analyzing");
      setProgress(0);
      setErrorMsg("");

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + (90 - prev) * 0.1;
        });
      }, 300);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim(), mode }),
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Analysis failed");
        }

        setProgress(100);
        const analysisResult: AnalysisResult = await response.json();
        setResult(analysisResult);
        setState("complete");
      } catch (err) {
        clearInterval(progressInterval);
        setErrorMsg(err instanceof Error ? err.message : "Analysis failed. Please try again.");
        setState("error");
      }
    },
    [url, mode]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <Flame className="inline h-8 w-8 text-roast mr-2" />
          Website <span className="gradient-text">Analyzer</span>
        </h1>
        <p className="text-muted-foreground">
          Paste any URL and get instant AI-powered feedback.
        </p>
      </motion.div>

      {/* URL Input + Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="https://your-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 bg-secondary/50 border-border flex-1"
              disabled={state === "analyzing"}
            />
            <Button
              type="submit"
              disabled={state === "analyzing" || !url.trim()}
              className="roast-gradient text-white border-0 hover:opacity-90 h-12 px-6"
            >
              {state === "analyzing" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Roast It
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <ModeSelector selected={mode} onSelect={setMode} />
        </form>
      </motion.div>

      {/* Error State */}
      <AnimatePresence>
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg mx-auto mb-8"
          >
            <div className="glass rounded-xl p-6 text-center border border-red-500/30">
              <p className="text-red-400 text-sm mb-3">{errorMsg}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setState("idle")}
              >
                Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {state === "analyzing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-lg mx-auto"
          >
            <div className="glass rounded-xl p-8 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-border" />
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-roast"
                    strokeDasharray={`${progress * 2.83} 283`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-roast">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                AI is analyzing {url}...
              </p>
              <div className="mt-4 w-full bg-secondary rounded-full h-1.5">
                <motion.div
                  className="roast-gradient rounded-full h-1.5"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {state === "complete" && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AnalysisResults result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
