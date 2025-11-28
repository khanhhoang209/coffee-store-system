FROM node:22-alpine AS build
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-alpine AS final
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /src/dist ./dist
COPY migrate-mongo-config.js ./
COPY migrations ./migrations
EXPOSE 8080
CMD ["node", "dist/server.js"]
