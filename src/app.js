const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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

app.use(express.json());

// middleware
app.use(bodyParser.json());

app.use("/api/v1", mainRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/toys", toyListingRouter);
app.use("/api/v1/stars", starSystemRouter);
app.use("/api/v1/requests", requestToyRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/favorites", favoriteToyRouter);

// connect to mongodb
connectDB();
// server
module.exports = app;
