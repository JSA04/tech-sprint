FROM node:22-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

FROM node:22-slim

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
