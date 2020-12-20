const log4js = require('log4js');

log4js.configure({
    appenders: { CoronaBot: { type: "file", filename: "../logs.log" } },
    categories: { default: { appenders: ["CoronaBot"], level: "error" } }
});

const logger = log4js.getLogger("CoronaBot");

logger.level = "debug";

// [2020-12-14T23:03:20.494] [DEBUG] coronabot - Got cheese.
function logDebug(message: string): void {
    logger.debug(message);
}

// [2020-12-14T23:22:01.069] [INFO] CoronaBot - Cheese is Comté.
function logInfo(message: string): void {
    logger.info(message);
}

// [2020-12-14T23:22:01.071] [WARN] CoronaBot - Cheese is quite smelly.
function logWarn(message: string): void {
    logger.warn(message);
}

// [2020-12-14T23:22:01.071] [ERROR] CoronaBot - Cheese is too ripe!
function logError(message: string): void {
    logger.error(message);
}

// [2020-12-14T23:22:01.071] [FATAL] CoronaBot - Cheese was breeding ground for listeria.
function logFatal(message: string): void {
    logger.fatal(message);
}

// [2020-12-14T23:31:58.109] [INFO] CoronaBot - User kankaj#2731 (161071543584030720) used command: help
function logUserActivity(userID: number, nickname: string, discriminator: number, command: string): void {
    logger.info(`User ${nickname}#${discriminator} (${userID}) used command: ${command}`);
}

// Used to log console input in core/initialize
export function logInit(message: string): void {
    logger.debug(message);
}