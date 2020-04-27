let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let tempObj = {};

const json = require("../../params.json");
const prodSchema = json.productSchema;
prodSchema.forEach((property) => {
  tempObj[property["prop"]] = {
    type: property["type"],
    required: property["required"],
    unique: false,
  };
});
let productSchema = new Schema(tempObj, {
  timestamps: false,
});

module.exports = productSchema;
