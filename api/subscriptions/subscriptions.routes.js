const Subscription = require("./subscriptions.controller.js");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/getAll",
  passport.authenticate(["jwt"], { session: false }),
  Subscription.getAll
);
router.get(
  "/get/:id",
  passport.authenticate(["jwt"], { session: false }),
  Subscription.get
);
router.post(
  "/create",
  passport.authenticate(["jwt"], { session: false }),
  Subscription.create
);
router.put(
  "/update/:id",
  passport.authenticate(["jwt"], { session: false }),
  Subscription.update
);
router.delete(
  "/delete/:id",
  passport.authenticate(["jwt"], { session: false }),
  Subscription.delete
);

module.exports = router;
