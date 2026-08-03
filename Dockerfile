FROM node:18-alpine

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

WORKDIR /app
ENV NODE_OPTIONS="--max_old_space_size=32000 --openssl-legacy-provider"

COPY package.json package-lock.json .npmrc ./
RUN npm install \
    && npm ci --include=dev

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG APP_ENV=development
ENV APP_ENV=$APP_ENV
ARG GA_CODE
ENV GA_CODE=$GA_CODE
ARG API_KEY
ENV API_KEY=$API_KEY

ARG CACHE_BUST=1
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN="$(cat /run/secrets/github_token 2>/dev/null || true)" npm run build

EXPOSE 8080
CMD ["node_modules/next/dist/bin/next", "start", "-p", "8080"]