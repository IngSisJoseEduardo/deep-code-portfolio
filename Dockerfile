# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependencias primero (aprovecha cache de capas)
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto del código y compila
COPY . .
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM nginx:stable-alpine AS runner

# Copia los archivos estáticos generados por Astro
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
