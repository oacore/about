# syntax=docker/dockerfile:1

# Next 16 needs Node >= 20.9
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
# No git in the image: skip husky's hook install during `pnpm install`
ENV HUSKY=0

FROM base AS app
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# @oacore/core-ui comes from GitHub Packages: the npm_token build secret (NPM_TOKEN in CI) is
# written to a temporary .npmrc, never to an image layer
RUN --mount=type=secret,id=npm_token \
    set -eu; \
    TOKEN="$(cat /run/secrets/npm_token 2>/dev/null | tr -d '\r\n' || true)"; \
    test -n "$TOKEN" || { echo "error: build secret npm_token is required for @oacore (GitHub Packages)" >&2; exit 1; }; \
    printf '%s\n' '@oacore:registry=https://npm.pkg.github.com' "//npm.pkg.github.com/:_authToken=${TOKEN}" > .npmrc; \
    pnpm install --frozen-lockfile; \
    rm -f .npmrc

COPY . .

#   APP_ENV  -> API host (development: api-dev, staging: api-stg, production: api.core.ac.uk)
#   GA_CODE  -> Google Analytics id
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG APP_ENV=development
ENV APP_ENV=$APP_ENV
ARG GA_CODE
ENV GA_CODE=$GA_CODE

ARG CACHE_BUST=1
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN="$(cat /run/secrets/github_token 2>/dev/null || true)" pnpm run build

EXPOSE 8080
CMD ["node_modules/next/dist/bin/next", "start", "-p", "8080"]
