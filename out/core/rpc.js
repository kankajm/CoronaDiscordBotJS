"use strict";
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function richPresence(serversJoined) {
    var rpcs = [
        ".corona help",
        "Helping on " + serversJoined + " servers!",
        ".corona invite",
        "corona-bot.eu",
    ];
    return rpcs[getRandomInt(rpcs.length)];
}
module.exports = { richPresence: richPresence };
