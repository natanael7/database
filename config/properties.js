module.exports = {
  PORT: 80,
  DB: "mongodb://localhost:27017/crud-mean",
};
let mongoose = require("mongoose");
let chalk = require("chalk");
let dbURL = require("./properties").DB;
let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;
