const express = require("express");
const app = express();
const cors = require("cors");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const connectDB = require("./config/db.js");
require("dotenv").config();

// importing routers
const mainRouter = require("./router/mainRouter.js"); // imports mainRouter

const userRouter = require("./router/userRouter.js"); // imports userRouter
const toyListingRouter = require("./router/toyListingRouter.js"); // imports toyListingRouter
const starSystemRouter = require("./router/starSystemRouter.js"); // imports starSystemRouter
const requestToyRouter = require("./router/requestToyRouter.js"); // imports requestToyRouter
const messageRouter = require("./router/messageRouter.js"); // imports messageRouter
const favoriteToyRouter = require("./router/favoriteToyRouter.js"); // imports favoriteToyRouter
const searchRouter = require("./router/searchRouter.js"); // imports searchRouter
const imageRouter = require("./router/imageRouter.js"); // imports imageRouter

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true })); //middleware configuration for an Express.js application, specifically for parsing incoming request bodies
app.use(express.json());

const User = require("../models/User"); // assuming you have this file at the given path

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5173/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails, name } = profile;
        const email = emails[0].value;
        let user = await User.findOne({ email });

        if (user) {
          // Update existing user
          user = await User.findOneAndUpdate(
            { email },
            {
              first_name: name.givenName,
              last_name: name.familyName,
              modified_date: new Date(),
            },
            { new: true }
          );
        } else {
          // Create a new user
          user = await User.create({
            email,
            first_name: name.givenName,
            last_name: name.familyName,
            created_by_id: id,
            modified_by_id: id,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Set secure to true if using https
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Route to start the OAuth flow
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// Callback route that Google will redirect to after a successful login
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to your desired page
    res.redirect("/");
  }
);

// middleware: use routers
app.use("/api/v1", mainRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/toys", toyListingRouter);
app.use("/api/v1/stars", starSystemRouter);
app.use("/api/v1/requests", requestToyRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/favorites", favoriteToyRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/images", imageRouter);

// connect to mongodb
connectDB();
// server
module.exports = app;
