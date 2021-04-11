"use strict";
const api = require('./apiRequests');
function APILiveCheck() {
    const APIStatus = api.APIStatusCode();
    APIStatus.then(function (statusCode) {
        if (statusCode === 200) {
            console.log('API is OK, continuing running bot.');
        }
        else {
            console.log('API does not work. Restarting/Stopping bot.');
            process.exit();
        }
    });
}
function initializeBot(botVersion, systemName, nodeVersion, botName, botID) {
    // Prints basic info about server and status
    console.log(`Bot is online! Bot version: ${botVersion}`);
    console.log(`Server is running on ${systemName}, Node.js version: ${nodeVersion}`);
    console.log(`Name: ${botName}`);
    console.log(`ID: ${botID}`);
    // Check if API is working. If not shuts the bot.
    APILiveCheck();
}
module.exports = { initializeBot, APIOK: api.APIStatusCode().then(function (statusCode) {
        if (statusCode === 200) {
            return true;
        }
        else {
            return false;
        }
    }) };
