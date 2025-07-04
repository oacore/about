# Stage 1: Build stage
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Securely mount .npmrc via Docker secret (from GitHub Actions)
RUN --mount=type=secret,id=npmrc cp /run/secrets/npmrc ~/.npmrc \
 && echo "@oacore:registry=https://npm.pkg.github.com/" >> ~/.npmrc

# Copy only dependency-related files first
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy full source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Runtime stage
FROM node:16-alpine

# Add dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app /app

# Expose app port
EXPOSE 8080

# Use dumb-init as entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Start the Next.js server
CMD ["node_modules/next/dist/bin/next", "start", "-p", "8080"]
