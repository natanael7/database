const express = require("express");
const app = express();

const customer = require("../api/customers/customers.routes");
const coupon = require("../api/coupons/coupons.routes");
const product = require("../api/products/products.routes");
const order = require("../api/orders/orders.routes");

require("../auth/jwt");

app.use("/customer", customer);
app.use("/coupon", coupon);
app.use("/product", product);
app.use("/order", order);

module.exports = app;
