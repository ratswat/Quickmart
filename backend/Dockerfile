FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "run", "dev"]
