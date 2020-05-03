let mongoose = require("mongoose");
let productSchema = require("./products.model");

productSchema.statics = {
  get: function (query, cb) {
    this.find(query, cb);
  },
};

let productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
