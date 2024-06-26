const express = require("express");
const router = express.Router();
const requestToyController = require("../controller/requestToyController.js");

// Define routes
router.post("/", requestToyController.createToyRequest);
router.get("/:id", requestToyController.getToyRequest);
router.get("/", requestToyController.getAllToyRequest); // GET all toy requests

module.exports = router;
