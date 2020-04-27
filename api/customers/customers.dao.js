let mongoose = require("mongoose");
let customerSchema = require("./customers.model");

customerSchema.statics = {
  create: function (data, cb) {
    let hero = new this(data);
    hero.ltv = 0;
    hero.orders = [];
    hero.subscriptions = [];
    hero.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByName: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

let customerModel = mongoose.model("Customer", customerSchema);
module.exports = customerModel;
