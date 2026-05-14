export type AnalysisMode =
  | "roast"
  | "professional"
  | "indian-business"
  | "gamer"
  | "ecommerce";

export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  icon: string;
}

export interface RoastComment {
  category: string;
  comment: string;
  severity: "mild" | "medium" | "savage";
}

export interface AnalysisResult {
  id: string;
  url: string;
  screenshotUrl: string;
  mode: AnalysisMode;
  overallScore: number;
  scores: ScoreCategory[];
  roastComments: RoastComment[];
  professionalFeedback: string[];
  redesignSuggestions: string[];
  heroRewrite: string;
  ctaSuggestions: string[];
  createdAt: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}
