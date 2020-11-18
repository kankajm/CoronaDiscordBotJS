FROM node:latest

COPY . /app

RUN apt-get update

RUN npm install discord.js
RUN npm install pm2 -g
RUN npm install axios
RUN npm install is-reachable
RUN npm install -g typescript

RUN npm i @types/node

RUN tsc /app/index.ts
RUN tsc /app/data_formatting.ts
RUN tsc /app/apireq.ts

CMD ["pm2-runtime", "/app/index.js"]