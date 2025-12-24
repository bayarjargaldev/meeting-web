# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments
ARG NODE_ENV=production
ARG CI_COMMIT_SHA
ENV CI_COMMIT_SHA=$CI_COMMIT_SHA
ENV NODE_ENV=$NODE_ENV

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including vite for preview command)
RUN npm ci

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
