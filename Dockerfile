FROM node:4
MAINTAINER Fernando Valverde <fdov88@gmail.com>

WORKDIR /app

# Dependencies & app
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
ADD . /app

EXPOSE 5000

CMD ["npm", "start"]
