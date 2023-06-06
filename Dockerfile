# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Copy the entire project to the working directory
COPY . .

# Install project dependencies using yarn
RUN yarn install

# Build the Next.js application
RUN yarn build

# Expose the desired port (change 3000 if your Next.js app uses a different port)
EXPOSE 3000

# Run the Next.js application
CMD ["yarn", "start"]