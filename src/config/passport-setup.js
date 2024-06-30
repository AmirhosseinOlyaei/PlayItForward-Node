// src/config/passport-setup.js
require("dotenv").config();
const User = require("../../models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

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

// Local Strategy for username and password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }
        const isMatch = await user.validPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Helper function to generate a unique nickname
const generateUniqueNickname = async (first_name, last_name) => {
  let nickname = `${first_name} ${last_name}`;
  let count = 1;
  while (await User.findOne({ nickname })) {
    nickname = `${first_name} ${last_name} ${count}`;
    count++;
  }
  return nickname;
};

// Google Strategy for Google authentication
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
          // Generate a unique nickname
          const first_name = profile.name.givenName;
          const last_name = profile.name.familyName;
          const nickname = await generateUniqueNickname(first_name, last_name);

          // Create new user with received profile and tokens
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            first_name,
            last_name,
            nickname,
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

module.exports = passport;
