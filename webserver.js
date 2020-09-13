var express = require('express');
function startWebServer() {
    var app = express();
    app.get('/', function (req, res) {
        res.send({ "uptime": process.uptime(),
            "process_name": "coronabot",
            "node_version": process.version });
    });
    var port = 5001;
    app.listen(port, function () { return console.log("ONLINE CONTROL IS RUNNING ON PORT: " + port); });
}
module.exports = { startWebServer: startWebServer };
