// src/app.js
const express = require("express");
const app = express();
const MongoStore = require("connect-mongo");

const passport = require("passport");
const session = require("express-session");

const cors = require("cors");
const connectDB = require("./config/db.js");

require("dotenv").config();
const allowedOrigins = ["https://ffprac-team4-front.vercel.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `This site ${origin} is not allowed to access this resource.`;
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  })
);

require("./config/passport-setup.js");

// Enabling secure cookies
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    }, // secure cookies in production
  })
);

// Middleware to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
// app.use(cors({ origin: "*" }));

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
