import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PublicRoastView } from "@/components/roast/public-roast-view";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { AnalysisResult, ScoreCategory, RoastComment, AnalysisMode } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getScan(slug: string) {
  const scan = await prisma.scan.findUnique({ where: { slug } });
  if (!scan || !scan.isPublic) return null;
  return scan;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scan = await getScan(slug);

  if (!scan) {
    return { title: "Roast Not Found — RoastIQ" };
  }

  const domain = scan.url.replace(/^https?:\/\//, "").replace(/\/.*/, "");

  return {
    title: `${domain} Website Roast — RoastIQ`,
    description: `AI-generated website roast for ${domain}. Score: ${scan.overallScore}/100. See the full breakdown.`,
    openGraph: {
      title: `${domain} scored ${scan.overallScore}/100 on RoastIQ`,
      description: `AI-powered website roast and conversion analysis. See the full breakdown.`,
      type: "article",
      images: [`/api/og?slug=${slug}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${domain} scored ${scan.overallScore}/100 on RoastIQ`,
      description: `AI-powered website roast and conversion analysis.`,
      images: [`/api/og?slug=${slug}`],
    },
  };
}

export default async function PublicRoastPage({ params }: PageProps) {
  const { slug } = await params;
  const scan = await getScan(slug);

  if (!scan) {
    notFound();
  }

  const result: AnalysisResult = {
    id: scan.id,
    url: scan.url,
    screenshotUrl: scan.screenshotUrl || "",
    mode: scan.mode as AnalysisMode,
    overallScore: scan.overallScore,
    scores: scan.scores as unknown as ScoreCategory[],
    roastComments: scan.roastComments as unknown as RoastComment[],
    professionalFeedback: scan.professionalFeedback as unknown as string[],
    redesignSuggestions: scan.redesignSuggestions as unknown as string[],
    heroRewrite: scan.heroRewrite || "",
    ctaSuggestions: scan.ctaSuggestions as unknown as string[],
    createdAt: scan.createdAt.toISOString(),
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <PublicRoastView result={result} slug={slug} />
      </main>
      <Footer />
    </>
  );
}
