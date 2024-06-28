// services/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

// Local strategy for username/password authentication
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        const isValid = await user.validPassword(password);
        if (!isValid) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google strategy for Google OAuth
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
          currentUser.accessToken = accessToken;
          currentUser.refreshToken = refreshToken;
          await currentUser.save();
          done(null, currentUser);
        } else {
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
