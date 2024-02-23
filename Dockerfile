# Use uma imagem LTS do Node.js
FROM node:21.5-alpine AS builder

# Defina as variáveis de ambiente
ARG NODE_ENV
ARG JWT_SECRET
ARG JWT_EXPIRES_IN_MINUTES
ARG JWT_REFRESH_SECRET
ARG JWT_REFRESH_EXPIRES_IN_MINUTES

ENV NODE_ENV=$NODE_ENV
ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRES_IN_MINUTES=$JWT_EXPIRES_IN_MINUTES
ENV JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET
ENV JWT_REFRESH_EXPIRES_IN_MINUTES=$JWT_REFRESH_EXPIRES_IN_MINUTES

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração
COPY package*.json ./

# Instale as dependências, incluindo as de desenvolvimento
RUN npm install

# Copie o restante do código-fonte
COPY . .

# Construa o aplicativo
RUN npm run build

# Use uma imagem mais leve para o ambiente de execução
FROM node:21.5-alpine

# Install dumb-init
RUN apk add --no-cache dumb-init

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos necessários do estágio de construção
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponha a porta do aplicativo
EXPOSE 3000

RUN addgroup -S appuser && adduser -S appuser -G appuser \
    && chown -R appuser:appuser /app/ \
    && chmod 756 /app/

USER appuser

# Comando de execução padrão
CMD ["dumb-init", "node", "dist/src/main.js"]
