const { PORT = 8000 } = process.env;
const app = require("./app");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/passport-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);