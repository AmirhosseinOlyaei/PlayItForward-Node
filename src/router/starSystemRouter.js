const express = require("express");
const router = express.Router();
const starSystemController = require("../controller/starSystemController.js");

// Define routes
router.post("/rating", starSystemController.createRating);
router.get("/:id", starSystemController.getAverageStarsGivenToUser);

module.exports = router;
