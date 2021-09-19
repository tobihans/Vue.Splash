FROM node:16.8.0-alpine3.14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build


FROM nginx:1.21.1-alpine
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
