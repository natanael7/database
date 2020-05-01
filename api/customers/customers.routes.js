const Customer = require("./customers.controller.js");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/getAll",
  passport.authenticate(["jwt"], { session: false }),
  Customer.getAll
);
router.get(
  "/get/:id",
  passport.authenticate(["jwt"], { session: false }),
  Customer.get
);
router.post(
  "/create",
  passport.authenticate(["jwt"], { session: false }),
  Customer.create
);
router.post(
  "/filter",
  passport.authenticate(["jwt"], { session: false }),
  Customer.filter
);
router.put(
  "/update/:id",
  passport.authenticate(["jwt"], { session: false }),
  Customer.update
);
router.delete(
  "/delete/:id",
  passport.authenticate(["jwt"], { session: false }),
  Customer.delete
);
router.delete(
  "/deleteAll",
  passport.authenticate(["jwt"], { session: false }),
  Customer.debugDelete
);

module.exports = router;
