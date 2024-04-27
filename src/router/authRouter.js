require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/authController.js");

// middle ware to ensure that a user is authnicated!
function checkIfUserIsAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("User is not authenticated!");
}

// this route initiates the authentication process with Google
router.get("/google", authController.authenticateGoogle);

// after google authenticates the user, they are redirected to this route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, gets redirected.
    // console.log(req.user);
    res.redirect(process.env.FRONTEND_URL); // redirects to API route that sends user data
  }
);

// auth logoutrouter.get("/logout", (req, res) => {
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid", { path: "/" }); // Clear session cookie
    res.status(200).send("User logged out");
  });
});

module.exports = router;
