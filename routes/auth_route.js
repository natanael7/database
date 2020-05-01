const express = require("express");
const router = express.Router();
const passport = require("passport");
const token = require("../token");
const User = require("../model/user");

require("../auth/jwt");
require("../auth/local");
require("../auth/google");
require("../auth/facebook");

// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
  const accessToken = token.generateAccessToken(req.user._id);
  res.send("Bearer " + accessToken);
}
router.post("/register", function (req, res, next) {
  console.log("registering user");

  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err) {
      if (err) {
        console.log("error while user register!", err);
        return next(err);
      }

      console.log("user registered!");

      res.send("registered");
    }
  );
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  generateUserToken
);

module.exports = router;
