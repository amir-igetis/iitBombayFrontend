# Use node LTS version for better stability
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and lock file first to leverage Docker cache
COPY package*.json ./

# Install dependencies (use ci for cleaner installation)
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose Vite's default port (3000) and optionally HMR (Hot Module Replacement) port (5173)
EXPOSE 3000 5173

# Set the environment to development (optional)
ENV NODE_ENV=development

# Start the application
CMD ["npm", "run", "dev"]




# # Use latest node image
# FROM node

# # Set working directory 
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all source code
# COPY . .

# # Expose port for development
# EXPOSE 3000 

# # Start app in dev mode
# CMD ["npm", "start"]