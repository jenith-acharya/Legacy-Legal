
# STAGE 1: Frontend Build

FROM node:18-alpine AS frontend-builder

WORKDIR /app/LLS front

COPY LLS front/package*.json ./

RUN npm install

COPY LLS front/ ./

RUN npm run build



# STAGE 2: Backend Install

FROM node:18-alpine AS backend-runner

WORKDIR /app/LLS back

COPY LLS back/package*.json ./

RUN npm install 

COPY LLS back/ .

COPY --from=frontend-builder /app/frontend/build /app/backend/public




EXPOSE 9000

CMD ["npm", "start"]

