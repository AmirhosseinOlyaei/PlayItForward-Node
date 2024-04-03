const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route to start the OAuth flow
router.get("/google", authController.googleAuth);

// Callback route that Google will redirect to after a successful login
router.get(
  "/google/callback",
  authController.googleAuthCallback,
  authController.redirectAfterAuth
);

module.exports = router;
