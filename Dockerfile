# Use official Node.js Alpine image for a lightweight container
FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production

# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source files
COPY --chown=node:node . .

# Switch to non-root user for security
USER node

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
