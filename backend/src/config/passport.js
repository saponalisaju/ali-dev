require("dotenv").config();
const passport = require("passport");
const User = require("../models/userModel");
const { jwtActivationKey } = require("../../secret");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtActivationKey,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("jwt", jwt_payload);
    User.findById({ id: jwt_payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

module.exports = passport;
