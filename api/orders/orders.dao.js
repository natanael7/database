let mongoose = require("mongoose");
let orderSchema = require("./orders.model");

orderSchema.statics = {
  create: function (data, cb) {
    let hero = new this(data);
    hero.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },
};

let orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
