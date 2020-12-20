"use strict";
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function richPresence(serversJoined) {
    var rpcs = [
        ".corona help",
        "Helping on " + serversJoined + " servers!",
        ".corona invite",
    ];
    return rpcs[getRandomInt(rpcs.length)];
}
// ! add "corona-bot.eu" later
module.exports = { richPresence: richPresence };
