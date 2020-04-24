var Order = require("./orders.controller");

module.exports = function (router) {
  router.post("/create", Order.createOrder);
  router.get("/get", Order.getOrders);
  router.get("/get/:name", Order.getOrder);
  router.put("/update/:id", Order.updateOrder);
  router.delete("/remove/:id", Order.removeOrder);
  router.delete("/deleteAll", Order.debugDelete);
};
