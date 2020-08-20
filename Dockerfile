FROM node:latest

COPY . /app

RUN apt-get update

RUN npm install discord.js
RUN npm install axios
RUN npm install chalk
RUN npm install is-reachable

EXPOSE 50001

CMD node /app/index.js