const Subscription = require("./subscriptions.controller.js");

module.exports = function (router) {
  router.post("/subscription/create", Subscription.create);
  router.get("/subscription/getAll", Subscription.getAll);
  router.get("/subscription/get/:id", Subscription.get);
  router.put("/subscription/update/:id", Subscription.update);
  router.delete("/subscription/delete/:id", Subscription.delete);
};
