# ─────────────────────────────────────────────
# Stage 1 — Build React app
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Cache node_modules
COPY package*.json ./
RUN npm install 

# Build
COPY public ./public
COPY src    ./src
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2 — Serve with Nginx
# ─────────────────────────────────────────────
FROM nginx:1.25-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built React app
COPY --from=builder /app/build /usr/share/nginx/html

# Non-root execution
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
