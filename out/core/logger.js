"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInit = void 0;
const log4js = require('log4js');
log4js.configure({
    appenders: { CoronaBot: { type: "file", filename: "../logs.log" } },
    categories: { default: { appenders: ["CoronaBot"], level: "error" } }
});
const logger = log4js.getLogger("CoronaBot");
logger.level = "debug";
// [2020-12-14T23:03:20.494] [DEBUG] coronabot - Got cheese.
function logDebug(message) {
    logger.debug(message);
}
// [2020-12-14T23:22:01.069] [INFO] CoronaBot - Cheese is Comté.
function logInfo(message) {
    logger.info(message);
}
// [2020-12-14T23:22:01.071] [WARN] CoronaBot - Cheese is quite smelly.
function logWarn(message) {
    logger.warn(message);
}
// [2020-12-14T23:22:01.071] [ERROR] CoronaBot - Cheese is too ripe!
function logError(message) {
    logger.error(message);
}
// [2020-12-14T23:22:01.071] [FATAL] CoronaBot - Cheese was breeding ground for listeria.
function logFatal(message) {
    logger.fatal(message);
}
// [2020-12-14T23:31:58.109] [INFO] CoronaBot - User kankaj#2731 (161071543584030720) used command: help
function logUserActivity(userID, nickname, discriminator, command) {
    logger.info(`User ${nickname}#${discriminator} (${userID}) used command: ${command}`);
}
// Used to log console input in core/initialize
function logInit(message) {
    logger.debug(message);
}
exports.logInit = logInit;
