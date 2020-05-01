const passport = require("passport");
const passportLocal = require("passport-local");
const config = require("../config/config");
const User = require("../model/user");

passport.use(
  new passportLocal.Strategy(function (name, password, done) {
    User.findOne({ name: name }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
