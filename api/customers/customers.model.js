let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let customerSchema = new Schema({
  account: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  region: {
    type: String,
  },
  city: {
    type: String,
  },
  postCode: {
    type: String,
  },
  adress: {
    type: String,
  },
  date: {
    type: String,
  },
  id: {
    type: Number,
  },
  orders: {
    type: Array,
    default:[]
  },
  ltv: {
    type: Number,
    default: 0
  },
});

module.exports = customerSchema;
