"use strict";
var os = require('os');
var osName = require('os-name');
module.exports = { systemName: osName(os.platform(), os.release()), nodeVersion: process.version };
