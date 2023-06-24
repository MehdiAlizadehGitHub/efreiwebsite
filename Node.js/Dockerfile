# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /Node.js

# Copy the application files into the working directory
COPY ./Node.js/app

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]