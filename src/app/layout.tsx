import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/auth/session-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoastIQ — AI Website Roast & Conversion Analyzer",
  description:
    "RoastIQ analyzes your website's trust, design, conversion psychology, and user experience in seconds. Get savage roasts and actionable insights.",
  keywords: [
    "website roast",
    "conversion optimization",
    "UX analysis",
    "AI website review",
    "website audit",
  ],
  openGraph: {
    title: "RoastIQ — AI Website Roast & Conversion Analyzer",
    description:
      "Your website might be losing customers. RoastIQ tells you why — with savage humor and real insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
