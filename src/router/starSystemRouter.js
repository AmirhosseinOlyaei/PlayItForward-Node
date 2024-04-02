const express = require("express");
const router = express.Router();
const starSystemController = require("../controller/starSystemController.js");

// Define routes
router.post("/", starSystemController.giveStars);
router.get("/", starSystemController.getStars);
router.get("/:id", starSystemController.getStar);

module.exports = router;
