require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/user");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log("passport callback function fired:");
      console.log(profile);
      new User({
        googleId: profile.id,
        username: profile.displayName,
      })
        .save()
        .then((newUser) => {
          console.log("new user created: ", newUser);
        });
    }
  )
);
