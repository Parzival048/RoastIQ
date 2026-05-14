import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PublicRoastView } from "@/components/roast/public-roast-view";
import type { Metadata } from "next";
import { DEMO_ROAST } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} Website Roast — RoastIQ`,
    description: `See the AI-generated roast and conversion analysis for ${slug}. Score: ${DEMO_ROAST.overallScore}/100`,
    openGraph: {
      title: `${slug} scored ${DEMO_ROAST.overallScore}/100 on RoastIQ`,
      description: `AI-powered website roast and conversion analysis. See the full breakdown.`,
      type: "article",
    },
  };
}

export default async function PublicRoastPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const result = {
    ...DEMO_ROAST,
    id: slug,
    url: `https://${slug}.com`,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <PublicRoastView result={result} />
      </main>
      <Footer />
    </>
  );
}
