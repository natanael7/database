const Order = require("./orders.controller");

module.exports = function (router) {
  router.post("/createOrder", Order.create);
  router.get("/getAllOrder", Order.getAll);
  router.put("/updateOrder/:id", Order.update);
  router.delete("/deleteOrder/:id", Order.delete);
  router.get("/summaryAllOrder", Order.summaryAll);
  router.post("/filterOrder", Order.filter);
  router.post("/summaryFilter", Order.summaryFilter);
  
  // BETA

  router.get("/get/:id", Order.get);
  router.delete("/deleteAll", Order.debugDelete);
};
