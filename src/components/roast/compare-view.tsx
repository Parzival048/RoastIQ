"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Plus, X, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { AnalysisResult } from "@/types";

interface ComparisonData {
  results: AnalysisResult[];
  winner: AnalysisResult;
  insights: string[];
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function getDomain(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
}

export function CompareView() {
  const [urls, setUrls] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ComparisonData | null>(null);
  const [error, setError] = useState("");

  const addUrl = () => {
    if (urls.length < 4) setUrls([...urls, ""]);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 2) setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, value: string) => {
    const updated = [...urls];
    updated[index] = value;
    setUrls(updated);
  };

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    const validUrls = urls.filter((u) => u.trim());
    if (validUrls.length < 2) {
      setError("Enter at least 2 URLs to compare");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: validUrls, mode: "professional" }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Comparison failed");
      }

      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Comparison failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <Trophy className="inline h-8 w-8 text-roast mr-2" />
          Competitor <span className="gradient-text">Comparison</span>
        </h1>
        <p className="text-muted-foreground">
          Compare up to 4 websites side by side with AI-powered analysis.
        </p>
        <Badge variant="secondary" className="mt-2">
          Pro Feature
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <form onSubmit={handleCompare} className="space-y-3">
          {urls.map((url, i) => (
            <div key={i} className="flex gap-2">
              <Input
                type="url"
                placeholder={`https://website-${i + 1}.com`}
                value={url}
                onChange={(e) => updateUrl(i, e.target.value)}
                className="h-11 bg-secondary/50 border-border"
                disabled={loading}
              />
              {urls.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeUrl(i)}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <div className="flex gap-3">
            {urls.length < 4 && (
              <Button
                type="button"
                variant="outline"
                onClick={addUrl}
                disabled={loading}
                className="flex-1"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add URL
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading || urls.filter((u) => u.trim()).length < 2}
              className="flex-1 roast-gradient text-white border-0 hover:opacity-90 h-11"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Comparing...
                </>
              ) : (
                <>
                  Compare
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}
        </form>
      </motion.div>

      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Winner Banner */}
            <div className="glass rounded-2xl p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h2 className="text-xl font-bold mb-1">
                Winner: <span className="gradient-text">{getDomain(data.winner.url)}</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Score: {data.winner.overallScore}/100
              </p>
            </div>

            {/* Side by Side Scores */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${data.results.length}, 1fr)` }}>
              {data.results.map((result) => (
                <div key={result.id} className="glass rounded-xl p-5 text-center">
                  <h3 className="text-sm font-bold truncate mb-2">{getDomain(result.url)}</h3>
                  <div className={`text-4xl font-bold mb-3 ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}
                  </div>
                  <div className="space-y-2">
                    {result.scores.map((score) => (
                      <div key={score.name} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground truncate">{score.name}</span>
                        <span className={`font-bold ${getScoreColor(score.score)}`}>
                          {score.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Insights */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Flame className="h-4 w-4 text-roast" />
                Key Insights
              </h3>
              <div className="space-y-3">
                {data.insights.map((insight, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-roast font-bold">{i + 1}.</span>
                    <span className="text-muted-foreground">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
