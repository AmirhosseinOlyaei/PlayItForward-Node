// src/router/profileRouter.js
const router = require("express").Router();
const profileController = require("../controller/profileController.js");

// Route to render user profile if authenticated
router.get("/", profileController.authCheck, profileController.renderProfile);

module.exports = router;
