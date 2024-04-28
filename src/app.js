const express = require("express");
const app = express();
const router = require("express").Router();
const MongoStore = require("connect-mongo");

const passport = require("passport");
const session = require("express-session");

const cors = require("cors");
const connectDB = require("./config/db.js");

require("dotenv").config();
require("./config/passport-setup.js");

// Enabling secure cookies
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      // secure: false,
      secure: app.get("env") === "production", // secure cookies in production
      maxAge: 24 * 60 * 60 * 1000,
    }, // secure cookies in production
  })
);

// Middleware to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Initialize Passport and sessions for Passport
app.use(passport.initialize());
app.use(passport.session());

// Importing routers
const mainRouter = require("./router/mainRouter.js");
const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/userRouter.js");
const toyListingRouter = require("./router/toyListingRouter.js");
const starSystemRouter = require("./router/starSystemRouter.js");
const requestToyRouter = require("./router/requestToyRouter.js");
const messageRouter = require("./router/messageRouter.js");
const favoriteToyRouter = require("./router/favoriteToyRouter.js");
const searchRouter = require("./router/searchRouter.js");
const imageRouter = require("./router/imageRouter.js");
const termsAgreementRouter = require("./router/termsAgreementRouter.js");

// Using routers
app.use("/api/v1", mainRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/toys", toyListingRouter);
app.use("/api/v1/stars", starSystemRouter);
app.use("/api/v1/requests", requestToyRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/favorites", favoriteToyRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/images", imageRouter);
app.use("/api/v1/terms", termsAgreementRouter);

app.use("/api/v1/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401).send("User is not authenticated!");
  }
});

// Connect to MongoDB
connectDB();

// Server
module.exports = app;
