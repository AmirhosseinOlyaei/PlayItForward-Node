const router = require("express").Router();
const passport = require("passport");

//auth logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(() => {
    res.redirect("/");
  });
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
  res.send(req.user);
  // res.redirect("/api/v1/");
});

module.exports = router;
