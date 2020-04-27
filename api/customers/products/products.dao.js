let mongoose = require("mongoose");
let productSchema = require("./products.model");

productSchema.statics = {
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

let productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
