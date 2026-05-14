# RoastIQ — AI Website Roast & Conversion Analyzer

RoastIQ is an AI-powered SaaS platform that combines humorous website roasts with professional UX/UI analysis, conversion optimization insights, and actionable redesign recommendations.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **AI**: OpenAI API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- OpenAI API key (for AI analysis)

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

- **Multiple Analysis Modes**: Roast, Professional, E-Commerce, Gamer, Indian Business
- **Scoring System**: Trust, Design, Conversion, Gen Z Attention, Professionalism, Mobile
- **Shareable Results**: Public roast pages, social sharing, copy-to-clipboard
- **Before/After Redesign**: AI-generated improvement suggestions
- **Dashboard**: Scan history, analytics, saved reports
- **Pricing Tiers**: Free, Pro ($29/mo), Agency ($99/mo)
- **Dark Theme**: Premium cinematic design with orange/red accents

## Project Structure

```
src/
├── app/
│   ├── api/analyze/     # Analysis API route
│   ├── dashboard/       # User dashboard
│   ├── roast/           # Analysis page + public roast pages
│   └── page.tsx         # Landing page
├── components/
│   ├── dashboard/       # Dashboard components
│   ├── landing/         # Landing page sections
│   ├── roast/           # Roast/analysis components
│   ├── shared/          # Navbar, Footer
│   └── ui/              # ShadCN components
├── lib/                 # Utilities, constants, mock data
└── types/               # TypeScript types
```

## License

MIT
