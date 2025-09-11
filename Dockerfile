FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

#NPM_TOKEN
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

#GA_CODE
ARG GA_CODE
ENV GA_CODE=$GA_CODE

#API_KEY
ARG API_KEY
ENV API_KEY=$API_KEY

WORKDIR /app

ENV NODE_OPTIONS="--max_old_space_size=32000 --openssl-legacy-provider"

# Copy source code
COPY . .

# Install dependencies
RUN npm install \
    && npm ci --include=dev

# Build the app in production mode
RUN npm run build

EXPOSE 8080
CMD ["node_modules/next/dist/bin/next", "start", "-p", "8080"]
