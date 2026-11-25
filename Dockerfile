# syntax=docker/dockerfile:1

# Next 16 needs Node >= 20.9
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
# No git in the image: skip husky's hook install during `pnpm install`
ENV HUSKY=0

# package.json depends on "file:../@dashboard/core-ui" (the local checkout next to this repo);
# CI checks core-ui out into ./core-ui and it is placed at that same relative path here
FROM base AS core-ui
WORKDIR /@dashboard/core-ui
COPY core-ui/ ./
RUN pnpm install --frozen-lockfile && pnpm run build

FROM base AS app
COPY --from=core-ui /@dashboard/core-ui /@dashboard/core-ui
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# The core-ui checkout is only for the stage above
RUN rm -rf core-ui

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
