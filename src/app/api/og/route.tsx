import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    let domain = "your-website.com";
    let score = 42;
    let mode = "roast";

    if (slug) {
      const scan = await prisma.scan.findUnique({ where: { slug } });
      if (scan) {
        domain = scan.url.replace(/^https?:\/\//, "").replace(/\/.*/, "");
        score = scan.overallScore;
        mode = scan.mode;
      }
    }

    const scoreColor = score >= 70 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%)",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "36px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Roast
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "36px",
                fontWeight: "bold",
                color: "#ef4444",
              }}
            >
              IQ
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "24px",
              padding: "40px 60px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "96px",
                  fontWeight: "bold",
                  color: scoreColor,
                  lineHeight: 1,
                }}
              >
                {score}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "20px",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "8px",
                }}
              >
                /100 Overall Score
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#fff",
              marginTop: "30px",
              fontWeight: "bold",
            }}
          >
            {domain}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "14px",
                color: "#ef4444",
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </div>
          </div>

          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "30px",
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            roastiq.ai — AI Website Roast & Conversion Analyzer
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}
