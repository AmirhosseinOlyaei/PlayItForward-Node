const express = require("express");
const router = express.Router();
const requestToyController = require("../controllers/requestToyController.js");

// Define routes
router.post("/", requestToyController.createToyRequest);
router.get("/", requestToyController.getAllToyRequests);

module.exports = router;