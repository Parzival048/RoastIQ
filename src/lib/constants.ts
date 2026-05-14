import type { PricingTier, AnalysisResult } from "@/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get a taste of the roast.",
    features: [
      "3 website scans/month",
      "Roast mode only",
      "Basic score breakdown",
      "Share roast cards",
    ],
    cta: "Start Roasting",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For teams serious about conversion.",
    features: [
      "Unlimited scans",
      "All analysis modes",
      "Professional reports",
      "Redesign suggestions",
      "Downloadable PDF reports",
      "Competitor comparison",
      "Priority analysis queue",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$99",
    period: "/month",
    description: "White-label for your clients.",
    features: [
      "Everything in Pro",
      "White-label exports",
      "Team access (up to 10)",
      "Client reporting dashboard",
      "Custom branding on reports",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const DEMO_ROAST: AnalysisResult = {
  id: "demo-1",
  url: "https://example-startup.com",
  screenshotUrl: "",
  mode: "roast",
  overallScore: 42,
  scores: [
    {
      name: "Trust Score",
      score: 35,
      maxScore: 100,
      description: "Your website whispers 'I might be a scam' to visitors.",
      icon: "🛡️",
    },
    {
      name: "Modern Design",
      score: 28,
      maxScore: 100,
      description: "This design was cutting-edge... in 2014.",
      icon: "🎨",
    },
    {
      name: "Conversion",
      score: 45,
      maxScore: 100,
      description: "Your CTA is playing hide and seek. And winning.",
      icon: "🎯",
    },
    {
      name: "Gen Z Attention",
      score: 15,
      maxScore: 100,
      description: "Gen Z scrolled past before the page even loaded.",
      icon: "⚡",
    },
    {
      name: "Professionalism",
      score: 52,
      maxScore: 100,
      description: "It looks professional-ish. Like a LinkedIn profile photo taken with a potato.",
      icon: "💼",
    },
    {
      name: "Mobile Experience",
      score: 68,
      maxScore: 100,
      description: "At least it loads on mobile. That's... something.",
      icon: "📱",
    },
  ],
  roastComments: [
    {
      category: "Hero Section",
      comment:
        "Your hero section is giving 'I asked ChatGPT to write my landing page' energy. The headline says everything and nothing at the same time.",
      severity: "savage",
    },
    {
      category: "Call to Action",
      comment:
        "This CTA is hiding like it owes taxes. I needed a search party to find your signup button.",
      severity: "savage",
    },
    {
      category: "Trust Signals",
      comment:
        "No testimonials, no logos, no social proof. Your website has the trust level of a 'FREE iPHONE' popup.",
      severity: "medium",
    },
    {
      category: "Visual Hierarchy",
      comment:
        "Everything is the same size and the same weight. It's like your designer discovered democracy and decided every element gets equal treatment.",
      severity: "medium",
    },
    {
      category: "Typography",
      comment:
        "Four different fonts? Your website looks like a ransom note designed by committee.",
      severity: "mild",
    },
  ],
  professionalFeedback: [
    "Simplify the hero section to a single, clear value proposition",
    "Add social proof above the fold — logos, testimonials, or user count",
    "Increase CTA button contrast and size by at least 40%",
    "Reduce the number of font families to maximum 2",
    "Add a sticky navigation bar for better conversion flow",
  ],
  redesignSuggestions: [
    "Replace the generic hero image with a product screenshot or demo video",
    "Move pricing section higher on the page to reduce friction",
    "Add a floating CTA that follows the user on scroll",
    "Implement a clean card-based layout for feature sections",
  ],
  heroRewrite:
    "Stop losing customers to bad design. Get AI-powered conversion insights in 30 seconds.",
  ctaSuggestions: [
    "Start Free Analysis →",
    "See What You're Missing",
    "Get Your Score Now",
  ],
  createdAt: new Date().toISOString(),
};

export const FEATURES = [
  {
    title: "AI-Powered Roasts",
    description:
      "Get brutally honest, witty feedback that exposes exactly why visitors are leaving.",
    icon: "🔥",
  },
  {
    title: "Conversion Psychology",
    description:
      "Deep analysis of trust signals, visual hierarchy, and buyer psychology.",
    icon: "🧠",
  },
  {
    title: "Instant Scoring",
    description:
      "6 key metrics scored in seconds. Trust, design, conversion, attention, professionalism, mobile.",
    icon: "📊",
  },
  {
    title: "Redesign Suggestions",
    description:
      "Get actionable before/after recommendations to fix your conversion killers.",
    icon: "✨",
  },
  {
    title: "Shareable Results",
    description:
      "Generate viral roast cards and share your score across social media.",
    icon: "📤",
  },
  {
    title: "Multiple Modes",
    description:
      "Roast, Professional, E-commerce, Gamer, Indian Business — pick your lens.",
    icon: "🎭",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Founder, PixelPerfect",
    content:
      "RoastIQ roasted our landing page so hard we redesigned it overnight. Conversions went up 340%. Best $29 we ever spent.",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Growth, ScaleUp",
    content:
      "We shared our roast on Twitter and it went viral. 50K impressions in 24 hours. The insights were actually incredible though.",
    avatar: "MJ",
  },
  {
    name: "Priya Sharma",
    role: "CEO, DevBoost",
    content:
      "The Indian Business mode caught issues our expensive agency missed. WhatsApp CTA visibility, UPI placement — game changer.",
    avatar: "PS",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How does RoastIQ analyze my website?",
    answer:
      "RoastIQ captures a screenshot of your website, then uses advanced AI to analyze visual hierarchy, trust signals, conversion elements, typography, color psychology, CTA placement, and overall user experience. The analysis takes about 15-30 seconds.",
  },
  {
    question: "Is the roast mode safe for work?",
    answer:
      "Yes! While our roasts are savage and witty, they're always professional. Think of it as brutally honest feedback from a friend who happens to be a conversion expert — not mean-spirited insults.",
  },
  {
    question: "Can I share my roast results?",
    answer:
      "Absolutely! Every roast generates shareable cards, public URLs, and social-ready images. Many of our users share their roasts on Twitter/X and they regularly go viral.",
  },
  {
    question: "What's the difference between Roast and Professional mode?",
    answer:
      "Roast mode gives you funny, internet-native feedback that's great for sharing. Professional mode provides serious UX/UI analysis with actionable recommendations — perfect for actually improving your site.",
  },
  {
    question: "Do you support all types of websites?",
    answer:
      "Yes! We have specialized modes for e-commerce, gaming communities, Indian businesses, and general websites. Our AI adapts its analysis based on the type of site you're analyzing.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel anytime. No lock-in, no hidden fees. Your Pro or Agency features will remain active until the end of your billing period.",
  },
];
