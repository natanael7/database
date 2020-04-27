let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let tempObj = {};

const json = require("../../params.json");
const subSchema = json.subscriptionSchema;
subSchema.forEach((property) => {
  tempObj[property["prop"]] = {
    type: property["type"],
    required: property["required"],
    unique: false,
  };
});
let subscriptionSchema = new Schema(tempObj, {
  timestamps: false,
});

module.exports = subscriptionSchema;
