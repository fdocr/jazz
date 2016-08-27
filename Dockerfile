FROM node:4
MAINTAINER Fernando Valverde <fdov88@gmail.com>

WORKDIR /app

# Dependencies & app
COPY package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org && \
    npm install -q && \
    npm ls && \
    mv /app/node_modules /node_modules
COPY . /app

# Previous command adds local node_modules from build machine
# They need to be removed to avoid tainting the image
RUN rm -rf /app/node_modules

EXPOSE 5000

CMD ["npm", "start"]
