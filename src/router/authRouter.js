// src/router/authRouter.js
require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/authController.js");

// Middleware to ensure that a user is authenticated
function checkIfUserIsAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("User is not authenticated!");
}

// Route to handle user signup
router.post("/signup", authController.signup);

// Route to handle user signin
router.post("/signin", authController.signin);

// Route to handle forgot password
router.post("/forgot-password", authController.forgotPassword);

// Route to handle reset password
router.post("/reset-password/:token", authController.resetPassword);

// Route to initiate the authentication process with Google
router.get("/google", authController.authenticateGoogle);

// Route to handle Google authentication callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, gets redirected.
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

// Route to handle user logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid", { path: "/" }); // Clear session cookie
    res.redirect(process.env.FRONTEND_URL);
  });
});

module.exports = router;
