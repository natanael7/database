var mongoose = require("mongoose");
var Schema = mongoose.Schema;
let tempObj = {};

const json = require("../../params.json");
const custSchema = json.customerSchema;
custSchema.forEach((property) => {
  tempObj[property["prop"]] = {
    type: property["type"],
    required: property["required"],
    unique: false,
  };
});
var customerSchema = new Schema(tempObj, {
  timestamps: false,
});

module.exports = customerSchema;
