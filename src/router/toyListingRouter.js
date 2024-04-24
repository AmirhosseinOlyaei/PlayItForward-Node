const express = require("express");
const router = express.Router();
const toyListingController = require("../controller/toyListingController.js");

// Define routes
router.post("/", toyListingController.createToyListing); // POST new toy listing
router.get("/", toyListingController.getAllToyListings); // GET all toy listings
router.get("/:id", toyListingController.getToyListing); // GET toy listing by ID
router.put("/:id", toyListingController.updateToyListing); //update toy listing
router.delete("/:id", toyListingController.deleteToyListing); //delete toy listing
router.get("/enums/:fieldName", toyListingController.getEnumValues); //get enum values

router.get("/user/:userId", toyListingController.getToyListingsByUser); // GET toy listings by user ID

module.exports = router;
