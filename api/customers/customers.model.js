let mongoose = require("mongoose");
let Schema = mongoose.Schema;
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
let customerSchema = new Schema(tempObj, {
  timestamps: false,
});

module.exports = customerSchema;
