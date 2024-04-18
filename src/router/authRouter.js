const router = require("express").Router();
const passport = require("passport");

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  res.send("logging out");
});

// auth google by activating google strategy
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route that Google will redirect to after a successful login
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send("you reached the callback URI");
});

module.exports = router;
