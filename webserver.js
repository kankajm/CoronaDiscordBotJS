const express = require('express');
const chalk = require('chalk');

function startWebServer() {
    const app = express();

    app.get('/', (req, res) => {
        res.send({"uptime": process.uptime(),
                  "process_name": "coronabot",
                  "node_version": process.version});
    });
    const port = 5001;
    app.listen(port, () => console.log(chalk.green.bold('[INFO]') + ' ONLINE CONTROL IS RUNNING ON PORT: ' + port));
}

module.exports = { startWebServer }