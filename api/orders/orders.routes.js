const Order = require("./orders.controller.js");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/getAll",
  passport.authenticate(["jwt"], { session: false }),
  Order.getAll
);
router.get(
  "/summaryAll",
  passport.authenticate(["jwt"], { session: false }),
  Order.summaryAll
);
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
router.post(
  "/filter",
  passport.authenticate(["jwt"], { session: false }),
  Order.filter
);
router.post(
  "/summaryFilter",
  passport.authenticate(["jwt"], { session: false }),
  Order.summaryFilter
);
router.put(
  "/update/:id",
  passport.authenticate(["jwt"], { session: false }),
  Order.update
);
router.delete(
  "/delete/:id",
  passport.authenticate(["jwt"], { session: false }),
  Order.delete
);
router.delete(
  "/deleteAll",
  passport.authenticate(["jwt"], { session: false }),
  Order.debugDelete
);

module.exports = router;
