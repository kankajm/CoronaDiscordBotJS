const http = require("http");
const chalk = require('chalk');
const { checkerPort } = require('./config.json');

const host = 'localhost';
const port = checkerPort;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end();
};

function startWebServer() {
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
    console.log(chalk.green.bold('[INFO]') + ' ONLINE CONTROL IS RUNNING ON PORT: ' + port)
    });
}

module.exports = { startWebServer }