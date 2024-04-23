// src/server.js
// const { PORT = 8000 } = process.env;
const PORT = process.env.PORT || 8000;
const app = require("./app");
const passport = require("passport");
const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
