// initializing express
const express = require("express");
const app = express();

// middleware to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initializing passport
const passport = require("passport");
const session = require("express-session");

const cors = require("cors");
const connectDB = require("./config/db.js");
require("dotenv").config();

// importing routers
const mainRouter = require("./router/mainRouter.js"); // imports mainRouter
const authRouter = require("./router/authRouter.js"); // imports authRouter

const userRouter = require("./router/userRouter.js"); // imports userRouter
const toyListingRouter = require("./router/toyListingRouter.js"); // imports toyListingRouter
const starSystemRouter = require("./router/starSystemRouter.js"); // imports starSystemRouter
const requestToyRouter = require("./router/requestToyRouter.js"); // imports requestToyRouter
const messageRouter = require("./router/messageRouter.js"); // imports messageRouter
const favoriteToyRouter = require("./router/favoriteToyRouter.js"); // imports favoriteToyRouter
const searchRouter = require("./router/searchRouter.js"); // imports searchRouter
const imageRouter = require("./router/imageRouter.js"); // imports imageRouter
// const { secureHeapUsed } = require("crypto");

app.use(cors({ origin: "*" }));

// middleware: use routers
require("./config/passport-setup.js");
app.use("/api/v1", mainRouter);
app.use("/api/v1/auth", authRouter);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session()); // Needed for persistent login sessions

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
