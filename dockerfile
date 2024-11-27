# Dockerfile

# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Add build arguments for database credentials
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD

# Set environment variables inside the container
ENV DB_HOST=$DB_HOST
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD

# Expose the port
EXPOSE 4002

# Start the application
CMD ["node", "index.js"]
