const express = require("express");
const router = express.Router();
const favoriteToyController = require("../controller/favoriteToyController.js");

// Define routes
router.post("/", favoriteToyController.addFavoriteToy);
router.get("/", favoriteToyController.getAllFavoriteToys);
router.get("/:id", favoriteToyController.getFavoriteToyByUserId);
router.delete("/:id", favoriteToyController.deleteFavoriteToy);

module.exports = router;
