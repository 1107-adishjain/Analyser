# # Stage 1: Build the Next.js App
# FROM node:18-alpine AS builder

# WORKDIR /app

# # Install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy source code
# COPY . .

# # Build the Next.js app
# RUN npm run build

# # Stage 2: Serve the app with Puppeteer-compatible environment
# FROM node:18-alpine

# WORKDIR /app

# # 🟢 Install necessary packages for Puppeteer and Chromium
# RUN apk add --no-cache \
#     chromium \
#     nss \
#     freetype \
#     harfbuzz \
#     ca-certificates \
#     ttf-freefont \
#     nodejs \
#     yarn

# # Set environment variables required by Puppeteer
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# # Copy only necessary files from builder
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.mjs ./next.config.mjs

# EXPOSE 3000

# CMD ["npm", "start"]

# -------- Stage 1: Build the Next.js app --------
FROM node:18-bullseye AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source and build
COPY . .
RUN npm run build


# -------- Stage 2: Production with Puppeteer + Chromium --------
FROM node:18-bullseye

# Install Chromium and all required libraries
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libnss3 \
  libxss1 \
  libasound2 \
  libx11-xcb1 \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Set Puppeteer Chromium path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copy only what's needed from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]
