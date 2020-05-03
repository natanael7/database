const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: {
    type: String,
  },
  number: {
    type: Number,
  },
  date: {
    type: String,
    default: () => {
      const today = new Date();
      const d = new Date(today);
      d.setDate(d.getDate());
      let mm = d.getMonth() + 1;
      let dd = d.getDate();
      let yy = d.getFullYear();
      let myDateString = dd + "." + mm + "." + yy; //(US)
      return myDateString;
    },
  },
  status: {
    type: Number,
    default: 1,
  },
  sum: {
    type: Number,
  },
  deliveryMethod: {
    type: String,
  },
  payingMethod: {
    type: String,
  },
  track: {
    type: String,
  },
  productSet: { type: Array },
});

module.exports = OrderSchema;
