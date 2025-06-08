# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make the .env file accessible within the Docker container
COPY .env .env

# Expose the port the app runs on
EXPOSE 7000

# Command to run the application
CMD ["node", "server.js"]

