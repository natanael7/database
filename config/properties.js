module.exports = {
  PORT: 4000,
  DB: "mongodb://localhost:27017/crud-mean",
};
var mongoose = require("mongoose");
var chalk = require("chalk");
var dbURL = require("./properties").DB;
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;