const Customer = require("./customers.controller.js");

module.exports = function (router) {
  router.post("/customer/create", Customer.create);
  router.get("/customer/getAll", Customer.getAll);
  router.put("/customer/update/:id", Customer.update);
  router.delete("/customer/delete/:id", Customer.delete);
  router.get("/customer/summaryAll", Customer.summaryAll);
  router.post("/customer/filter", Customer.filter);
  router.post("/customer/summaryFilter", Customer.summaryFilter);
  
  // BETA

  router.get("/customer/get/:id", Customer.get);
  router.delete("/customer/deleteAll", Customer.debugDelete);
};
