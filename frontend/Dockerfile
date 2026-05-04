# # ---- Stage 1: Build React App ----
# FROM node:18-alpine AS build

# # Set working directory
# WORKDIR /app

# # Copy package files first (for caching)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all frontend source code
# COPY . .

# # Build the production React app
# RUN npm run build

# # ---- Stage 2: Serve with Nginx ----
# FROM nginx:alpine

# # Copy built React files to Nginx's serving directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy custom Nginx config (handles React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]




# ---- Stage 1: Build React App ----
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .

# Build the production React app
RUN npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:alpine

# Copy built React files to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (handles React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]