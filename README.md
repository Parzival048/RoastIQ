# RoastIQ — AI Website Roast & Conversion Analyzer

RoastIQ is an AI-powered SaaS platform that combines humorous website roasts with professional UX/UI analysis, conversion optimization insights, and actionable redesign recommendations.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma 7 ORM
- **Auth**: NextAuth.js (Email + Google OAuth)
- **AI**: OpenAI API (gpt-4o-mini)
- **Screenshots**: Puppeteer
- **PDF Reports**: jsPDF
- **OG Images**: Next.js ImageResponse
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- OpenAI API key

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Set up your database URL and API keys in .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

### Core
- **5 Analysis Modes**: Roast, Professional, E-Commerce, Gamer, Indian Business
- **6-Category Scoring**: Trust, Design, Conversion, Gen Z Attention, Professionalism, Mobile
- **Real AI Analysis**: OpenAI gpt-4o-mini generates URL-specific insights
- **Website Screenshots**: Puppeteer captures live screenshots during analysis

### Sharing & Export
- **Public Roast Pages**: SEO-friendly URLs at `/roast/[slug]` with OG images
- **PDF Report Export**: Download professional audit reports
- **Social Sharing**: Share on X/Twitter, copy roast cards
- **OG Image Generation**: Dynamic social preview cards for each roast

### User Features
- **Authentication**: Email/password + Google OAuth via NextAuth
- **Dashboard**: Real scan history, analytics, saved reports (fetched from DB)
- **Competitor Comparison**: Compare up to 4 websites side by side (Pro feature)

### Admin
- **Admin Panel**: User management, scan moderation, featured roasts toggle
- **Role-based Access**: Admin role with elevated permissions

### Design
- **Premium Dark Theme**: Cinematic design with orange/red accent glows
- **Glassmorphism**: Backdrop blur effects on all panels
- **Framer Motion**: Smooth animations throughout
- **Responsive**: Fully mobile-responsive layout

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/         # Admin management API
│   │   ├── analyze/       # AI analysis API
│   │   ├── auth/          # NextAuth API routes
│   │   ├── compare/       # Competitor comparison API
│   │   ├── og/            # OG image generation
│   │   ├── report/        # PDF report generation
│   │   └── scans/         # User scans API
│   ├── admin/             # Admin panel page
│   ├── auth/signin/       # Sign in page
│   ├── compare/           # Competitor comparison page
│   ├── dashboard/         # User dashboard
│   ├── roast/             # Analysis page + public roast pages
│   └── page.tsx           # Landing page (10 sections)
├── components/
│   ├── admin/             # Admin panel components
│   ├── auth/              # Auth forms, session provider
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page sections
│   ├── roast/             # Roast/analysis components
│   ├── shared/            # Navbar, Footer
│   └── ui/                # ShadCN components
├── generated/prisma/      # Generated Prisma client
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client singleton
│   ├── ai-analysis.ts     # OpenAI integration
│   ├── screenshot.ts      # Puppeteer screenshot capture
│   ├── mock-analysis.ts   # Fallback mock data
│   ├── constants.ts       # App constants
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript types
```

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Set environment variables:
   - `DATABASE_URL` — PostgreSQL connection string
   - `OPENAI_API_KEY` — OpenAI API key
   - `NEXTAUTH_SECRET` — Random secret for JWT
   - `NEXTAUTH_URL` — Your deployment URL
   - `GOOGLE_CLIENT_ID` — (Optional) Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` — (Optional) Google OAuth client secret
   - `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` — Set to `true` to show Google sign-in
4. Deploy

> **Note**: Puppeteer screenshot capture requires a serverless function with enough memory. On Vercel, you may need to configure function size limits or use an external screenshot service for production.

## License

MIT
