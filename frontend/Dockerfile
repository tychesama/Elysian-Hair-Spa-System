# ── Base image ──────────────────────────────────────────────
FROM node:20-alpine

# ── Working directory inside the container ───────────────────
WORKDIR /app

# ── Install dependencies ─────────────────────────────────────
# Copy package files first (Docker caches this layer — faster rebuilds)
COPY package*.json ./
RUN npm install

# ── Copy project files ────────────────────────────────────────
COPY . .

# ── Expose Next.js port ───────────────────────────────────────
EXPOSE 3000

# ── Start command ─────────────────────────────────────────────
CMD ["npm", "run", "dev"]
