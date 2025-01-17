# Stage 1: Build the Angular app
FROM node:18.19 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the Angular app with production configuration
RUN npm run build -- --configuration=production

# Stage 2: Serve the Angular app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/food-delivery-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


