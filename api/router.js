const express = require("express");
const app = express();

const product = require("./products/products.routes");
const order = require("./orders/orders.routes");

require("../auth/jwt");

app.use("/product", product);
app.use("/order", order);

module.exports = app;
