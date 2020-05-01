const express = require("express");
const app = express();

const customer = require("./customers/customers.routes");
const coupon = require("./coupons/coupons.routes");
const product = require("./products/products.routes");
const subscription = require("./subscriptions/subscriptions.routes");
const order = require("./orders/orders.routes");

app.use("/customer", customer);
app.use("/coupon", coupon);
app.use("/product", product);
app.use("/subscription", subscription);
app.use("/order", order);

module.exports = app;
