const Order = require("./orders.controller.js");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/get/:id",
  passport.authenticate(["jwt"], { session: false }),
  Order.get
);
router.post(
  "/create",
  passport.authenticate(["jwt"], { session: false }),
  Order.create
);

module.exports = router;
