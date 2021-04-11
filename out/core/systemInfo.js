"use strict";
const os = require('os');
const osName = require('os-name');
module.exports = { systemName: osName(os.platform(), os.release()), nodeVersion: process.version };
