const passport = require("passport");

exports.authenticateGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = (req, res) => {
  res.send("you have been redirected to the homepage");
};
