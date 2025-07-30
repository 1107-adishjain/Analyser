# Stage 1: Build the Next.js App
FROM node:18-bullseye-slim AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Lightweight runtime with minimal Chromium setup
FROM node:18-bullseye-slim

WORKDIR /app

# Install only essential Chromium dependencies (much smaller subset)
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    chromium-sandbox \
    # Essential libraries only
    libnss3 \
    libxss1 \
    libasound2 \
    libxrandr2 \
    libatk1.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libxshmfence1 \
    # Clean up in same layer to reduce size
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* \
    && rm -rf /var/tmp/*

# Set Puppeteer environment variables
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROME_BIN=/usr/bin/chromium

# Copy built files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]