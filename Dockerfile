# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production

# Copy built frontend from build stage
COPY --from=build /app/dist ./dist

# Copy server and other necessary files
COPY server.js ./
COPY src ./src
COPY public ./public

# Create directory for SQLite database
RUN mkdir -p /app/data

# Expose port (Cloud Run uses PORT env variable)
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
