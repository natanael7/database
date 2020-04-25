var Order = require("./customers.controller");

module.exports = function (router) {
  router.post("/createOrder", Order.createOrder);
  router.get("/getAllOrder", Order.getAllOrder);
  router.put("/updateOrder/:id", Order.updateOrder);
  router.delete("/deleteOrder/:id", Order.deleteOrder);
  router.get("/summaryAllOrder", Order.summaryAllOrder);
  router.post("/filterOrder", Order.filterOrder);
  router.post("/summaryFilter", Order.summaryFilter);
  
  // BETA

  router.get("/get/:id", Order.getOrder);
  router.delete("/deleteAll", Order.debugDelete);
};
