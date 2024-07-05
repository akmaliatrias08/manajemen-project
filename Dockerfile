FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

#Copy the package.json & package-lock.json file to download dependencies
COPY package*.json .

#Download dependencies
RUN npm ci

# Copy the local package files to the container
COPY . .

#Run the app
CMD ["npm", "start"]

