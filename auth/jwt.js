const passport = require("passport");
const passportJwt = require("passport-jwt");
const config = require("../config/config");
const User = require("../model/user");

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  secretOrKey: config.authentication.token.secret,
  issuer: config.authentication.token.issuer,
  audience: config.authentication.token.audience,
};

passport.use(
  new passportJwt.Strategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub).then((user) => {
      if (typeof user != undefined) {
        return done(null, user, payload);
      }
      return done();
    });
  })
);
