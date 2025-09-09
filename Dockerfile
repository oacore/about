# Stage 1: Build
FROM node:18 AS builder

# Accept NPM token for private packages
ARG NPM_TOKEN

# Optional: Accept GA vars if absolutely needed at build time (usually unnecessary)
# ARG GA_MEASUREMENT_ID
# ARG GA_TRACKING_CODE
ARG GA_CODE
ENV GA_CODE=$GA_CODE
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$GA_CODE

# Set working directory
WORKDIR /app

# Configure private access to GitHub Packages and NPM
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > /root/.npmrc \
 && echo "@oacore:registry=https://npm.pkg.github.com/" >> /root/.npmrc \
 && echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> /root/.npmrc

# Copy dependency declarations
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Set environment for production build
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV \
    NODE_OPTIONS="--openssl-legacy-provider --max-old-space-size=4096"

# Run build (fail if broken)
RUN npm run build

# Copy the entire project
COPY . .

# Stage 2: Runtime
FROM node:18-alpine

# Install dumb-init for signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Copy built app from previous stage
COPY --from=builder /app /app

# Set NODE_ENV for runtime
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Expose the app port
EXPOSE 8080

# Entry point using dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Start Next.js in production mode
CMD ["node_modules/next/dist/bin/next", "start", "-p", "8080"]
