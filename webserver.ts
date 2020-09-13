const express = require('express');

function startWebServer() {
    const app = express();

    app.get('/', (req, res) => {
        res.send({"uptime": process.uptime(),
                  "process_name": "coronabot",
                  "node_version": process.version});
    });
    const port = 5001;
    app.listen(port, () => console.log(`ONLINE CONTROL IS RUNNING ON PORT: ${port}`));
}

module.exports = { startWebServer }