
# Etapa final: backend + frontend estático
FROM node:24.12.0-slim
WORKDIR /app


# Copia package.json e package-lock.json explicitamente
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

# Copia o código do projeto e gera o frontend
COPY . .
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
