const Coupon = require("./coupons.controller.js");

module.exports = function (router) {
  router.post("/coupon/create", Coupon.create);
  router.get("/coupon/getAll", Coupon.getAll);
  router.get("/coupon/get/:id", Coupon.get);
  router.put("/coupon/update/:id", Coupon.update);
  router.delete("/coupon/delete/:id", Coupon.delete);
};
