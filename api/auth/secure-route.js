const express = require("express");

const router = express.Router();

//Let's say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get("/profile", (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});
const Coupon = require("../coupons/coupons.controller.js");

router.post("/coupon/create", Coupon.create);
router.get("/coupon/getAll", Coupon.getAll);
router.get("/coupon/get/:id", Coupon.get);
router.get("/coupon/get/name/:name", Coupon.getByName);
router.put("/coupon/update/:id", Coupon.update);
router.delete("/coupon/delete/:id", Coupon.delete);


module.exports = router;
