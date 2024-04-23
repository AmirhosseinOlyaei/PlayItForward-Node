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

// auth google by activating google strategy
router.get("/google", authController.authenticateGoogle);

// callback route that Google will redirect to after a successful login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, gets redirected.
    console.log(req.user);
    res.redirect("/api/v1/users");
  }
);

// Route for getting user information, once they are authenticated
router.get("/user", checkIfUserIsAuthenticated, (req, res) => {
  res.send(req.user);
});

// auth logout
router.get("/logout", (req, res) => {
  //handled with passport
  req.logout();
  res.send("You have successfully logged out");
});

module.exports = router;
