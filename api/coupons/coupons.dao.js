let mongoose = require("mongoose");
let couponSchema = require("./coupons.model");

couponSchema.statics = {
  create: function (data, cb) {
    let hero = new this(data);
    hero.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

let couponModel = mongoose.model("Coupon", couponSchema);
module.exports = couponModel;
