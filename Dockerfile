FROM node:16.8.0-alpine3.14 AS build

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build


FROM nginx:1.21.1-alpine

COPY --from=build /app/dist /usr/share/nginx/html
