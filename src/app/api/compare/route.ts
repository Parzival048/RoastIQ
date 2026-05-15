import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI } from "@/lib/ai-analysis";
import { generateMockAnalysis } from "@/lib/mock-analysis";
import type { AnalysisMode, AnalysisResult } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls, mode = "professional" } = body as {
      urls: string[];
      mode?: AnalysisMode;
    };

    if (!urls || urls.length < 2 || urls.length > 4) {
      return NextResponse.json(
        { error: "Provide 2-4 URLs to compare" },
        { status: 400 }
      );
    }

    const urlPattern = /^https?:\/\/.+/;
    for (const url of urls) {
      if (!urlPattern.test(url)) {
        return NextResponse.json(
          { error: `Invalid URL: ${url}` },
          { status: 400 }
        );
      }
    }

    const results: AnalysisResult[] = [];
    for (const url of urls) {
      let result;
      if (process.env.OPENAI_API_KEY) {
        result = await analyzeWithAI(url, mode);
      } else {
        result = generateMockAnalysis(url, mode);
      }
      results.push(result);
    }

    const comparison = {
      results,
      winner: results.reduce((best, current) =>
        current.overallScore > best.overallScore ? current : best
      ),
      insights: generateComparisonInsights(results),
    };

    return NextResponse.json(comparison);
  } catch (error) {
    console.error("Comparison error:", error);
    return NextResponse.json(
      { error: "Failed to compare websites" },
      { status: 500 }
    );
  }
}

function generateComparisonInsights(results: AnalysisResult[]): string[] {
  const insights: string[] = [];
  const sorted = [...results].sort((a, b) => b.overallScore - a.overallScore);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  insights.push(
    `${getDomain(best.url)} leads with a score of ${best.overallScore}/100, ${best.overallScore - worst.overallScore} points ahead of ${getDomain(worst.url)}.`
  );

  const categories = best.scores.map((s) => s.name);
  for (const cat of categories) {
    const categoryScores = results.map((r) => ({
      domain: getDomain(r.url),
      score: r.scores.find((s) => s.name === cat)?.score || 0,
    }));
    const catBest = categoryScores.reduce((a, b) => (b.score > a.score ? b : a));
    const catWorst = categoryScores.reduce((a, b) => (b.score < a.score ? b : a));
    if (catBest.score - catWorst.score > 20) {
      insights.push(
        `${catBest.domain} significantly outperforms on ${cat} (${catBest.score} vs ${catWorst.domain}'s ${catWorst.score}).`
      );
    }
  }

  return insights;
}

function getDomain(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
}
