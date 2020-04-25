const Order = require("./orders.controller.js");

module.exports = function (router) {
  router.post("/order/create", Order.create);
  router.get("/order/getAll", Order.getAll);
  router.put("/order/update/:id", Order.update);
  router.delete("/order/delete/:id", Order.delete);
  router.get("/order/summaryAll", Order.summaryAll);
  router.post("/order/filter", Order.filter);
  router.post("/order/summaryFilter", Order.summaryFilter);
  
  // BETA

  router.get("/order/get/:id", Order.get);
  router.delete("/order/deleteAll", Order.debugDelete);
};
