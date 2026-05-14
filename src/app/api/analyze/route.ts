import { NextRequest, NextResponse } from "next/server";
import { generateMockAnalysis } from "@/lib/mock-analysis";
import type { AnalysisMode } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, mode = "roast" } = body as {
      url: string;
      mode?: AnalysisMode;
    };

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(url)) {
      return NextResponse.json(
        { error: "Invalid URL. Please include http:// or https://" },
        { status: 400 }
      );
    }

    const result = generateMockAnalysis(url, mode);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}
