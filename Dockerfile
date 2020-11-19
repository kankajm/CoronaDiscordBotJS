FROM node:current

COPY . /app

RUN apt-get update

RUN npm install discord.js
RUN npm install pm2 -g
RUN npm install axios
RUN npm install is-reachable
RUN npm install -g typescript
RUN npm install ts-node

RUN npm i @types/node

RUN tsc

CMD ["pm2-runtime", "/app/out/index.js"]