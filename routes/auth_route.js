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
router.get(
  "/google/start",
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
  })
);
router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  generateUserToken
);
router.get(
  "/facebook/start",
  passport.authenticate("facebook", {
    session: false,
    scope: ["public_profile"],
  })
);
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { session: false }),
  generateUserToken
);

module.exports = router;
