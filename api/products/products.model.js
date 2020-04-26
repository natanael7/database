let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let tempObj = {};

const json = require("../../params.json");
const ordSchema = json.orderSchema;
ordSchema.forEach((property) => {
  tempObj[property["prop"]] = {
    type: property["type"],
    required: property["required"],
    unique: false,
  };
});
let orderSchema = new Schema(tempObj, {
  timestamps: false,
});

module.exports = orderSchema;
