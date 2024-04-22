require("dotenv").config();

module.exports = {
  session: {
    cookieKey: process.env.SESSION_KEY,
  },
};
