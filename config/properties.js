module.exports = {
  PORT: 80,
  DB: "mongodb://natanael:natanael7@ds261648.mlab.com:61648/heroku_1m1s3x3k",
};
let mongoose = require("mongoose");
let chalk = require("chalk");
let dbURL = require("./properties").DB;
let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;
