
# STAGE 1: Frontend Build

FROM node:20-alpine as frontend-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build



# STAGE 2: Backend Install

FROM node:18-alpine as backend-build

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./



#STAGE 3: Production Image

FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend /app


COPY --from=frontend-build /app/client/build /app/client-build




EXPOSE 9000

CMD ["npm", "start"]

