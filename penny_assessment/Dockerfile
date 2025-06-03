FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci 

# Copy source code  
COPY .. ..

# Build the API
RUN npx nx build api --prod

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "dist/api/main.js"]