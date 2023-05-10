FROM node:10

WORKDIR  /app/node-backend
ADD . /app/node-backend

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
