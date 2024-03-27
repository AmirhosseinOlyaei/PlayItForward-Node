const express = require("express");
const app = express();

const connectDB = require("./config/db.js");
require("dotenv").config();

// importing routers
const mainRouter = require("./routes/mainRouter.js"); // imports mainRouter

const userRouter = require("./routes/userRouter.js"); // imports userRouter
const toyListingRouter = require("./routes/toyListingRouter.js"); // imports toyListingRouter
const starSystemRouter = require("./routes/starSystemRouter.js"); // imports starSystemRouter
const requestToyRouter = require("./routes/requestToyRouter.js"); // imports requestToyRouter
const messageRouter = require("./routes/messageRouter.js"); // imports messageRouter
const favoriteToyRouter = require("./routes/favoriteToyRouter.js"); // imports favoriteToyRouter

app.use(express.json());

// middleware
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
