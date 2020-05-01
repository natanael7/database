const Coupon = require("./coupons.controller.js");
const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get(
  "/getAll",
  passport.authenticate(["jwt"], { session: false }),
  Coupon.getAll
);
router.get(
  "/get/:id",
  passport.authenticate(["jwt"], { session: false }),
  Coupon.get
);
router.get(
  "/get/name/:name",
  passport.authenticate(["jwt"], { session: false }),
  Coupon.getByName
);
router.post(
  "/create",
  passport.authenticate(["jwt"], { session: false }),
  Coupon.create
);
router.put(
  "/update/:id",
  passport.authenticate(["jwt"], { session: false }),
  Coupon.update
);
router.delete(
  "/delete/:id",
  passport.authenticate(["jwt"], { session: false }),
  Coupon.delete
);

module.exports = router;
