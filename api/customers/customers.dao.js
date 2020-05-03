let mongoose = require("mongoose");
let customerSchema = require("./customers.model");

customerSchema.statics = {
  create: function (data, cb) {
    let customer = new this(data);
    return customer.save(cb);
  },
  get: function (query, cb) {
    this.find(query, cb);
  },
};

let customerModel = mongoose.model("Customer", customerSchema);
module.exports = customerModel;
