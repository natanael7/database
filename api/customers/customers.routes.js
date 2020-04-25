const Customer = require("./customers.controller");

module.exports = function (router) {
  router.post("/createCustomer", Customer.create);
  router.get("/getAllCustomer", Customer.getAll);
  router.put("/updateCustomer/:id", Customer.update);
  router.delete("/deleteCustomer/:id", Customer.delete);
  router.get("/summaryAllCustomer", Customer.summaryAll);
  router.post("/filterCustomer", Customer.filter);
  router.post("/summaryFilter", Customer.summaryFilter);
  
  // BETA

  router.get("/getCustomer/:id", Customer.get);
  router.delete("/deleteAllCustomer", Customer.debugDelete);
};
