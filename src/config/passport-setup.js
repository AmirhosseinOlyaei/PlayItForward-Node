// src/config/passport-setup.js
require("dotenv").config();
const User = require("../../models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          // Update existing user with new tokens
          currentUser.accessToken = accessToken;
          currentUser.refreshToken = refreshToken;
          await currentUser.save();
          done(null, currentUser);
        } else {
          // Create new user with received profile and tokens
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            nickname: profile.displayName,
            profile_picture: profile._json.picture,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);
