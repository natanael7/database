const Product = require("./products.controller.js");

module.exports = function (router) {
  router.post("/product/create", Product.create);
  router.get("/product/getAll", Product.getAll);
  router.get("/product/get/:id", Product.get);
  router.put("/product/update/:id", Product.update);
  router.delete("/product/delete/:id", Product.delete);
};
