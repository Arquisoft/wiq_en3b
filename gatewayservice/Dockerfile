# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/gatewayservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . .

ARG WEBAPP_URI="http://localhost:3000"
ARG GATEWAY_URI="http://localhost:8000"
ENV GATEWAY_ENDPOINT=$GATEWAY_URI
ENV WEBAPP_ENDPOINT=$WEBAPP_URI

# Compile TypeScript
RUN npm run tsc

# Define the command to run your app
CMD ["npm", "start"]

USER node