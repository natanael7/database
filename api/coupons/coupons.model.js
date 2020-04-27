let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let tempObj = {};

const json = require("../../params.json");
const prodSchema = json.couponSchema;
prodSchema.forEach((property) => {
  tempObj[property["prop"]] = {
    type: property["type"],
    required: property["required"],
    unique: false,
  };
});
let couponSchema = new Schema(tempObj, {
  timestamps: false,
});

module.exports = couponSchema;
