# ---- Base ----
FROM node:20-slim AS base

# Puppeteer needs these system libraries for Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libxshmfence1 \
    libglu1-mesa \
    wget \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN npm ci
RUN npx prisma generate

# ---- Builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/src/generated ./src/generated
COPY . .

# Build args for Next.js (needed at build time for static pages)
ARG NEXT_PUBLIC_GOOGLE_AUTH_ENABLED
ENV NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=$NEXT_PUBLIC_GOOGLE_AUTH_ENABLED

# Skip telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Runner ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tell Puppeteer to not download Chromium on npm install (we use the one from the image)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
