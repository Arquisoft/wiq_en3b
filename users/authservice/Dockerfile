# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/authservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . .

ARG JWT_KEY='your-secret-key'
ENV JWT_SECRET_KEY=$JWT_KEY

# Expose the port the app runs on
EXPOSE 8002

# Compile TypeScript
RUN npm run tsc

# Define the command to run your app
CMD ["npm", "start"]