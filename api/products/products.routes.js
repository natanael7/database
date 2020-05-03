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

module.exports = router;
