import type { AnalysisMode, AnalysisResult } from "@/types";

const roastCommentsByMode: Record<AnalysisMode, { category: string; comment: string; severity: "mild" | "medium" | "savage" }[]> = {
  roast: [
    { category: "Hero Section", comment: "Your hero section has the personality of a tax form. Visitors are falling asleep before they even reach the scroll.", severity: "savage" },
    { category: "Call to Action", comment: "This CTA is hiding like it owes taxes. I needed a search warrant to find your signup button.", severity: "savage" },
    { category: "Trust Signals", comment: "No testimonials, no logos, no social proof. Your site has the trust level of a 'FREE iPHONE' popup.", severity: "savage" },
    { category: "Visual Hierarchy", comment: "Everything competes for attention and nothing wins. It's visual democracy gone wrong.", severity: "medium" },
    { category: "Typography", comment: "Your font choices say 'I discovered Google Fonts and got excited.' Less is more.", severity: "mild" },
    { category: "Color Palette", comment: "This color scheme looks like a box of crayons had a nervous breakdown.", severity: "medium" },
    { category: "Mobile Experience", comment: "On mobile, your site loads like it's running on dial-up during a thunderstorm.", severity: "medium" },
    { category: "Loading Speed", comment: "Your page loads so slowly that visitors have time to rethink their entire existence.", severity: "savage" },
  ],
  professional: [
    { category: "Value Proposition", comment: "The primary value proposition is unclear. Visitors cannot determine the core benefit within 5 seconds.", severity: "savage" },
    { category: "CTA Placement", comment: "The primary call-to-action is below the fold and has insufficient contrast against the background.", severity: "medium" },
    { category: "Trust Architecture", comment: "No visible trust indicators above the fold. Consider adding customer logos, testimonials, or security badges.", severity: "medium" },
    { category: "Visual Hierarchy", comment: "The page lacks a clear visual hierarchy. F-pattern or Z-pattern reading flow is not optimized.", severity: "mild" },
    { category: "Form Design", comment: "Form fields lack proper labeling and inline validation. This increases form abandonment.", severity: "medium" },
    { category: "Navigation", comment: "Navigation structure is cluttered with 8+ top-level items. Best practice recommends 5-7 items maximum.", severity: "mild" },
  ],
  ecommerce: [
    { category: "Product Page", comment: "Product images lack zoom capability and multiple angles. This reduces purchase confidence by up to 40%.", severity: "savage" },
    { category: "Cart Experience", comment: "Your cart abandonment is likely high — no urgency indicators, no saved cart reminders, no exit-intent offers.", severity: "savage" },
    { category: "Checkout Flow", comment: "The checkout requires 5+ steps. Every extra step loses 10% of customers. Consider one-page checkout.", severity: "medium" },
    { category: "Social Proof", comment: "No product reviews visible on listing pages. 93% of consumers read reviews before purchasing.", severity: "medium" },
    { category: "Urgency Signals", comment: "Missing scarcity and urgency indicators. Stock levels, countdown timers, and recent purchases drive action.", severity: "mild" },
    { category: "Payment Trust", comment: "Payment security badges are not visible near checkout buttons. This is a major trust barrier.", severity: "medium" },
  ],
  gamer: [
    { category: "Hype Factor", comment: "This gaming site has the excitement level of a spreadsheet. Where are the epic visuals and energy?", severity: "savage" },
    { category: "Community Vibe", comment: "No Discord widget, no live player count, no community feed. It feels like a ghost server.", severity: "savage" },
    { category: "Visual Energy", comment: "Gaming sites need dynamic visuals — particles, animations, dark themes. This looks like a corporate portal.", severity: "medium" },
    { category: "CTA Hype", comment: "Your 'Join Now' button should scream excitement. Instead it whispers 'maybe later.'", severity: "medium" },
    { category: "Server Status", comment: "No live server status or player count visible. Gamers want to know the community is active.", severity: "mild" },
    { category: "Leaderboard", comment: "No visible leaderboards or achievement showcases. Gamers are motivated by competition and status.", severity: "mild" },
  ],
  "indian-business": [
    { category: "WhatsApp CTA", comment: "No WhatsApp button visible! 70% of Indian customers prefer WhatsApp for business inquiries.", severity: "savage" },
    { category: "Trust Badges", comment: "Missing GST number, business registration, or government certification badges that Indian buyers look for.", severity: "savage" },
    { category: "Payment Options", comment: "UPI, PhonePe, Google Pay logos not visible. Digital payment visibility is crucial for Indian customers.", severity: "medium" },
    { category: "Mobile-First", comment: "80% of Indian web traffic is mobile. Your site needs to be mobile-data-friendly with optimized images.", severity: "medium" },
    { category: "Regional Trust", comment: "Consider adding regional language options and local testimonials. Local trust signals convert better.", severity: "mild" },
    { category: "Price Display", comment: "Prices should be displayed in INR with clear inclusive/exclusive GST labeling.", severity: "mild" },
  ],
};

export function generateMockAnalysis(url: string, mode: AnalysisMode): AnalysisResult {
  const baseScore = 30 + Math.floor(Math.random() * 35);
  const variance = () => Math.floor(Math.random() * 30) - 15;

  const scores = [
    { name: "Trust Score", icon: "🛡️", base: baseScore + variance() },
    { name: "Modern Design", icon: "🎨", base: baseScore + variance() },
    { name: "Conversion", icon: "🎯", base: baseScore + variance() },
    { name: "Gen Z Attention", icon: "⚡", base: baseScore + variance() },
    { name: "Professionalism", icon: "💼", base: baseScore + variance() },
    { name: "Mobile Experience", icon: "📱", base: baseScore + variance() },
  ].map((s) => ({
    name: s.name,
    score: Math.max(10, Math.min(95, s.base)),
    maxScore: 100,
    description: getScoreDescription(s.name, Math.max(10, Math.min(95, s.base))),
    icon: s.icon,
  }));

  const overallScore = Math.round(
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length
  );

  const comments = roastCommentsByMode[mode] || roastCommentsByMode.roast;

  return {
    id: `analysis-${Date.now()}`,
    url,
    screenshotUrl: "",
    mode,
    overallScore,
    scores,
    roastComments: comments,
    professionalFeedback: [
      "Simplify the hero section to focus on a single, clear value proposition",
      "Add visible social proof above the fold — customer logos, testimonial, or user count",
      "Increase primary CTA contrast and size. It should be the most prominent element",
      "Reduce cognitive load by limiting choices on the homepage to 3 key actions",
      "Implement sticky navigation with a persistent CTA for better conversion flow",
      "Optimize image sizes for faster load times — target under 3 second LCP",
    ],
    redesignSuggestions: [
      "Replace the generic stock hero image with a product screenshot or video demo",
      "Restructure content hierarchy using a clear F-pattern layout",
      "Add a floating CTA button that persists on scroll for mobile users",
      "Implement a clean card-based feature grid with consistent iconography",
      "Add an interactive before/after slider showcasing results",
    ],
    heroRewrite:
      "Stop losing customers to bad design. Get AI-powered insights and fix your website in minutes.",
    ctaSuggestions: [
      "Start Free Analysis →",
      "See What You're Missing",
      "Get Your Score Now",
      "Fix My Website Today",
    ],
    createdAt: new Date().toISOString(),
  };
}

function getScoreDescription(name: string, score: number): string {
  const descriptions: Record<string, Record<string, string>> = {
    "Trust Score": {
      low: "Your website whispers 'I might be a scam' to every visitor.",
      mid: "Some trust signals present, but visitors still have doubts.",
      high: "Strong trust architecture. Visitors feel confident engaging.",
    },
    "Modern Design": {
      low: "This design was cutting-edge... in 2014. Time for an upgrade.",
      mid: "Decent foundations but missing modern polish and refinement.",
      high: "Clean, contemporary design that feels current and professional.",
    },
    Conversion: {
      low: "Your CTA is playing hide and seek. And winning every time.",
      mid: "Conversion elements exist but aren't optimized for action.",
      high: "Strong conversion architecture with clear paths to action.",
    },
    "Gen Z Attention": {
      low: "Gen Z scrolled past before the page even loaded.",
      mid: "Has some appeal but lacks the dynamic energy Gen Z expects.",
      high: "Engaging, fast, and visually dynamic. Gen Z approved.",
    },
    Professionalism: {
      low: "Looks like a weekend project that shipped on Monday morning.",
      mid: "Professional enough, but won't impress enterprise clients.",
      high: "Polished, credible, and enterprise-ready presentation.",
    },
    "Mobile Experience": {
      low: "Mobile users are leaving faster than a bad Tinder date.",
      mid: "Functional on mobile but not optimized for thumb navigation.",
      high: "Excellent mobile experience with smooth interactions.",
    },
  };

  const category = descriptions[name] || descriptions["Trust Score"];
  if (score < 40) return category.low;
  if (score < 70) return category.mid;
  return category.high;
}
