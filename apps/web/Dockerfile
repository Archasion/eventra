FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* .npmrc ./
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter @eventra/web build

FROM nginx:1.29-alpine AS runner
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
