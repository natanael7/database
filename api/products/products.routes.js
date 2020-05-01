const Product = require("./products.controller.js");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/getAll",
  passport.authenticate(["jwt"], { session: false }),
  Product.getAll
);
router.get(
  "/get/:id",
  passport.authenticate(["jwt"], { session: false }),
  Product.get
);
router.post(
  "/create",
  passport.authenticate(["jwt"], { session: false }),
  Product.create
);
router.put(
  "/update/:id",
  passport.authenticate(["jwt"], { session: false }),
  Product.update
);
router.delete(
  "/delete/:id",
  passport.authenticate(["jwt"], { session: false }),
  Product.delete
);

module.exports = router;
