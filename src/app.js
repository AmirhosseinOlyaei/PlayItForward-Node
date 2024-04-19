const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db.js");

require("dotenv").config();
require("./config/passport-setup.js"); // It's good to configure Passport before using it

// Middleware to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ origin: "*" }));

// Session configuration
app.use(
  session({
    secret: "keyboard cat", // Use a more secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // In production, ensure you are using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Cookie expires after 24 hours
    },
  })
);

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

// Connect to MongoDB
connectDB();

// Server
module.exports = app;
