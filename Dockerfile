FROM docker.io/node:wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
EXPOSE 1025

VOLUME /usr/mails
ENTRYPOINT ["node", "index.js"]
