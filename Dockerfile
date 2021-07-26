FROM node:alpine

WORKDIR /usr/src/api

# Copy package.json & package-lock.json to the root of the api dir
COPY ./api/package*.json ./

# Create an .env file by copying the .env.example file
COPY ./api/.env.example ./.env

# Add node_modules to the envionmental path variable so we can run binaries easily
ENV PATH ./api/node_modules/.bin:$PATH

USER root

# Install the good ol' NPM modules and get Adonis CLI in the game
RUN yarn

# Copy everything to the root of the API service docker volume, and expose port to the outside world
COPY --chown=node:node . .

# Let all incoming connections use the port below
EXPOSE 3333

CMD ["yarn", "dev"]