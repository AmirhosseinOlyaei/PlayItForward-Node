require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("express-favicon");
const logger = require("morgan");

const connectDB = require("./config/db.js");

// importing routers
const mainRouter = require("./routes/mainRouter.js"); // imports mainRouter
const userRouter = require("./routes/userRouter.js"); // imports userRouter
const toyListingRouter = require("./routes/toyListingRouter.js"); // imports toyListingRouter
const starSystemRouter = require("./routes/starSystemRouter.js"); // imports starSystemRouter
const toyRequestRouter = require("./routes/toyRequestRouter.js"); // imports requestToyRouter
const messageRouter = require("./routes/messageRouter.js"); // imports messageRouter
const favoriteToyRouter = require("./routes/favoriteToyRouter.js"); // imports favoriteToyRouter

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// routes
app.use("/api/v1", mainRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/toys", toyListingRouter);
app.use("/api/v1/stars", starSystemRouter);
app.use("/api/v1/requests", toyRequestRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/favorites", favoriteToyRouter);

module.exports = app;

// connect to db
connectDB();

// server
module.exports = app;
