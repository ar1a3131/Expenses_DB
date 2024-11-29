# Use an official Node.js runtime for the build stage
FROM node:14 AS build

# Set the working directory in the build container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server image for the final container
FROM nginx:stable-alpine

# Copy the React build files to the NGINX web root
COPY --from=build /app/build /usr/share/nginx/html

# Replace the default NGINX configuration to use port 3000
RUN sed -i 's/listen 80;/listen 3000;/' /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]

