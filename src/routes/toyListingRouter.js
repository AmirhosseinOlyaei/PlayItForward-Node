const express = require("express");
const router = express.Router();
const toyListingController = require("../controllers/toyListingController.js");

// Define routes
router.post("/", toyListingController.createToyListing);
router.get("/", toyListingController.getAllToyListings);
router.put("/:id", toyListingController.updateToyListing);
router.delete("/:id", toyListingController.deleteToyListing);

module.exports = router;
