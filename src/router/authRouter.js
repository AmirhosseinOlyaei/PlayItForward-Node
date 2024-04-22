const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/authController.js");

// auth google by activating google strategy
router.get("/google", authController.authenticateGoogle);

// callback route that Google will redirect to after a successful login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect("/api/v1");
  }
);

// auth logout
router.get("/logout", (req, res) => {
  //handled by passport
  req.logout();
  // res.redirect("");
});

module.exports = router;
