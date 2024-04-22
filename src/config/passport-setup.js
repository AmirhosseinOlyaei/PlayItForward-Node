require("dotenv").config();
const User = require("../../models/user");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // console.log("passport callback function fired:");
      // console.log(profile);

      // check if user already exists in our db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // we already have a record with the given profile ID
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          // if not, create a new user
          console.log("new user using profile: ", profile);
          new User({
            googleId: profile.id,
            email: "betiell.ab@gmail.com",
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            nickname: profile.displayName,
          })
            .save() //saves the new user to the database
            .then((newUser) => {
              console.log("new user created: ", newUser);
              done(null, newUser);
            })
            .catch((err) => {
              console.error("error creating new user: ", err);
              done(err);
            });
        }
      });
    }
  )
);
