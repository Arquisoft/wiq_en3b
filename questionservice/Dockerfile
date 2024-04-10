# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/questionservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Set the TRANSLATION_API_URI environment variable
ARG TRANSLATION_API_KEY="***"
ENV TRANSLATION_KEY=$TRANSLATION_API_KEY

# Copy the app source code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8004

# Compile TypeScript
RUN npm run tsc

# Define the command to run your app
CMD ["npm", "start"]