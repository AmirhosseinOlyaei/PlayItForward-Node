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
    res.redirect("/api/v1/user"); // redirects to API route that sends user data
  }
);

// auth logout
router.get("/logout", (req, res) => {
  //handled with passport
  req.logout();
  res.send("You have successfully logged out");
});

module.exports = router;
