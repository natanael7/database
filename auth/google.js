const passport = require("passport");
const passportGoogle = require("passport-google-oauth");
const config = require("../config/config");
const User = require("../model/user");

const passportConfig = {
  clientID: config.authentication.google.clientId,
  clientSecret: config.authentication.google.clientSecret,
  callbackURL: "http://localhost:3000/api/authentication/google/redirect",
};

if (passportConfig.clientID) {
  passport.use(
    new passportGoogle.OAuth2Strategy(passportConfig, function (
      request,
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      User.findOne({ provider: "google", uid: profile.id }).then((user) => {
        console.log("\n\n\nuser::" + user);

        if (!user) {
          console.log("user does not exists", user);
          User.create({
            name: profile.displayName,
            provider: "google",
            uid: profile.id,
            photoUrl: profile._json.picture,
          }).then((user) => {
            return done(null, user);
            console.log("eita exec hoy nken!!user");
          });
        } else {
          console.log("user already exists", user);
          return done(null, user);
        }
      });
    })
  );
}
