import OpenAI from "openai";
import type { AnalysisMode, AnalysisResult, RoastComment, ScoreCategory } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getSystemPrompt(mode: AnalysisMode): string {
  const baseContext = `You are RoastIQ, an AI website analysis expert. You analyze websites for trust, design quality, conversion optimization, and user experience.`;

  const modePrompts: Record<AnalysisMode, string> = {
    roast: `${baseContext}
You provide SAVAGE, WITTY, FUNNY roasts of websites. Your commentary should be:
- Brutally honest but professional
- Internet-native and witty (think stand-up comedian meets UX designer)
- Specific to the actual website elements
- Examples: "This CTA is hiding like it owes taxes", "Your homepage feels emotionally unavailable", "Visitors leave faster than a bad Tinder date"
Keep roasts under 2 sentences each. Be creative and varied - never repeat the same joke structure.`,

    professional: `${baseContext}
You provide SERIOUS, PROFESSIONAL UX/UI analysis. Your feedback should be:
- Data-driven and actionable
- Reference specific UX principles and best practices
- Cover CTA clarity, trust signals, hierarchy, typography, readability, mobile responsiveness, branding consistency, conversion flow
- Professional tone suitable for client presentations`,

    "indian-business": `${baseContext}
You specialize in analyzing Indian SMB websites. Focus on:
- WhatsApp CTA visibility (critical for Indian businesses)
- UPI/payment option visibility (PhonePe, Google Pay, Paytm)
- Trust badges relevant to Indian market (GST, FSSAI, ISO certifications)
- Mobile-data friendliness (many users on limited data plans)
- Regional language support
- Indian buyer psychology and trust patterns
- Local SEO elements`,

    gamer: `${baseContext}
You analyze gaming community and esports websites. Focus on:
- Hype factor and visual energy
- Gamer aesthetics (dark themes, neon accents, dynamic elements)
- Discord integration visibility
- Community engagement features
- CTA excitement level
- Server status/player count visibility
- Competitive/leaderboard elements
Use gamer-friendly language and references.`,

    ecommerce: `${baseContext}
You analyze e-commerce websites for conversion optimization. Focus on:
- Product page trust signals
- Urgency and scarcity indicators
- Cart/checkout friction
- Image quality and presentation
- Social proof and reviews
- Payment security visibility
- Mobile shopping experience
- Shipping/return policy clarity`,
  };

  return modePrompts[mode];
}

function getAnalysisPrompt(url: string, mode: AnalysisMode): string {
  return `Analyze the website at: ${url}

Based on the URL and what a typical website at this domain might look like, provide a comprehensive analysis.

Return your analysis as a JSON object with this exact structure:
{
  "overallScore": <number 1-100>,
  "scores": [
    {"name": "Trust Score", "score": <number 1-100>, "description": "<1-2 sentence assessment>"},
    {"name": "Modern Design", "score": <number 1-100>, "description": "<1-2 sentence assessment>"},
    {"name": "Conversion", "score": <number 1-100>, "description": "<1-2 sentence assessment>"},
    {"name": "Gen Z Attention", "score": <number 1-100>, "description": "<1-2 sentence assessment>"},
    {"name": "Professionalism", "score": <number 1-100>, "description": "<1-2 sentence assessment>"},
    {"name": "Mobile Experience", "score": <number 1-100>, "description": "<1-2 sentence assessment>"}
  ],
  "roastComments": [
    {"category": "<section name>", "comment": "<${mode === "roast" ? "funny savage roast" : "professional feedback"}>", "severity": "<mild|medium|savage>"}
  ],
  "professionalFeedback": ["<actionable improvement 1>", "<actionable improvement 2>", ...],
  "redesignSuggestions": ["<specific redesign suggestion 1>", "<specific redesign suggestion 2>", ...],
  "heroRewrite": "<suggested hero headline copy>",
  "ctaSuggestions": ["<CTA text 1>", "<CTA text 2>", "<CTA text 3>"]
}

Provide 6-8 roast comments, 5-6 professional feedback items, 4-5 redesign suggestions, and 3-4 CTA suggestions.
Make scores realistic and varied - don't cluster them all around the same number.
Be specific to what this type of website likely contains. Avoid generic feedback.

Return ONLY the JSON object, no markdown formatting or code blocks.`;
}

export async function analyzeWithAI(
  url: string,
  mode: AnalysisMode
): Promise<AnalysisResult> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: getSystemPrompt(mode) },
      { role: "user", content: getAnalysisPrompt(url, mode) },
    ],
    temperature: 0.8,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content || "";

  let parsed;
  try {
    const cleanedContent = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    parsed = JSON.parse(cleanedContent);
  } catch {
    throw new Error("Failed to parse AI response");
  }

  const icons: Record<string, string> = {
    "Trust Score": "🛡️",
    "Modern Design": "🎨",
    Conversion: "🎯",
    "Gen Z Attention": "⚡",
    Professionalism: "💼",
    "Mobile Experience": "📱",
  };

  const scores: ScoreCategory[] = (
    parsed.scores as Array<{ name: string; score: number; description: string }>
  ).map((s) => ({
    name: s.name,
    score: Math.max(1, Math.min(100, s.score)),
    maxScore: 100,
    description: s.description,
    icon: icons[s.name] || "📊",
  }));

  const roastComments: RoastComment[] = (
    parsed.roastComments as Array<{
      category: string;
      comment: string;
      severity: string;
    }>
  ).map((c) => ({
    category: c.category,
    comment: c.comment,
    severity: (["mild", "medium", "savage"].includes(c.severity)
      ? c.severity
      : "medium") as "mild" | "medium" | "savage",
  }));

  return {
    id: `analysis-${Date.now()}`,
    url,
    screenshotUrl: "",
    mode,
    overallScore: Math.max(1, Math.min(100, parsed.overallScore)),
    scores,
    roastComments,
    professionalFeedback: parsed.professionalFeedback || [],
    redesignSuggestions: parsed.redesignSuggestions || [],
    heroRewrite: parsed.heroRewrite || "",
    ctaSuggestions: parsed.ctaSuggestions || [],
    createdAt: new Date().toISOString(),
  };
}
