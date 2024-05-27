# websocket-server/Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7788

CMD ["node", "websocketServer.js"]
