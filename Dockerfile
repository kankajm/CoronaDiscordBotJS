FROM node:current

COPY . /app

RUN apt-get update

RUN npm install discord.js
RUN npm install pm2 -g
RUN npm install axios
RUN npm install is-reachable
RUN npm install -g typescript
RUN npm install cheerio
RUN npm install dotenv
RUN npm install log4js
RUN npm install os-name
RUN npm install request
RUN npm install request-promise

RUN npm i @types/node

RUN tsc

CMD ["pm2-runtime", "/app/out/index.js"]