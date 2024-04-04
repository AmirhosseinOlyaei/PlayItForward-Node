const express = require("express");
const app = express();
const cors = require("cors");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true })); //middleware configuration for an Express.js application, specifically for parsing incoming request bodies
app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5173/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can handle the user's profile information returned by Google
      // For example, you might find or create a user in your database
      // For now, we'll just pass the profile to the done callback
      done(null, profile);
    }
  )
);

// Serialize and deserialize user (required for session handling)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());

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
// connect to mongodb
connectDB();
// server
module.exports = app;
