import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { analyzeWithAI } from "@/lib/ai-analysis";
import { generateMockAnalysis } from "@/lib/mock-analysis";
import { captureScreenshot } from "@/lib/screenshot";
import { prisma } from "@/lib/prisma";
import type { AnalysisMode } from "@/types";

function generateSlug(url: string): string {
  const domain = url.replace(/^https?:\/\//, "").replace(/\/.*/g, "").replace(/[^a-zA-Z0-9.-]/g, "");
  const rand = Math.random().toString(36).slice(2, 8);
  return `${domain}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, mode = "roast" } = body as {
      url: string;
      mode?: AnalysisMode;
    };

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(url)) {
      return NextResponse.json(
        { error: "Invalid URL. Please include http:// or https://" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id || null;

    let result;
    if (process.env.OPENAI_API_KEY) {
      result = await analyzeWithAI(url, mode);
    } else {
      result = generateMockAnalysis(url, mode);
    }

    let screenshotUrl: string | null = null;
    try {
      screenshotUrl = await captureScreenshot(url);
    } catch {
      // screenshot capture is non-critical
    }
    if (screenshotUrl) {
      result.screenshotUrl = screenshotUrl;
    }

    const slug = generateSlug(url);

    const scan = await prisma.scan.create({
      data: {
        userId,
        url,
        mode,
        overallScore: result.overallScore,
        screenshotUrl: screenshotUrl || "",
        scores: JSON.parse(JSON.stringify(result.scores)),
        roastComments: JSON.parse(JSON.stringify(result.roastComments)),
        professionalFeedback: result.professionalFeedback as string[],
        redesignSuggestions: result.redesignSuggestions as string[],
        heroRewrite: result.heroRewrite,
        ctaSuggestions: result.ctaSuggestions,
        isPublic: true,
        slug,
      },
    });

    result.id = scan.id;

    return NextResponse.json({ ...result, slug });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}
