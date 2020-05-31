# BUILD
FROM node:10.15-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# DEPLOY
FROM nginx:1.17-alpine
COPY --from=build /usr/src/app/dist/ik-koop-mijn-energie /usr/share/nginx/html
