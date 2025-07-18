#stage:1

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

#stage:2

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules 

COPY --from=builder /app .

EXPOSE 9000

CMD ["node", "index.js"]
