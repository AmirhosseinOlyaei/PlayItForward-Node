// src/router/authRouter.js
const express = require("express");
const passport = require("passport");
const authController = require("../controller/authController.js");
const router = express.Router();

// Local authentication routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/forgot-password", authController.forgotPassword);

// Google authentication routes
router.get("/google", authController.authenticateGoogle);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid", { path: "/" });
    res.redirect(process.env.FRONTEND_URL);
  });
});

module.exports = router;
