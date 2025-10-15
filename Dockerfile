# Stage 1: Build React app

FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html


# Expose port 80
EXPOSE 80
# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
