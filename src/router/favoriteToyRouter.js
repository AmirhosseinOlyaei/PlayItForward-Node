const express = require("express");
const router = express.Router();
const favoriteToyController = require("../controller/favoriteToyController.js");

// Define routes
router.post("/", favoriteToyController.addFavoriteToy);
router.get("/", favoriteToyController.getAllFavoriteToys);
router.get("/:id", favoriteToyController.getFavoriteToyByUserId);
// Route to check if a toy listing is in the user's favorites
router.get(
  "/check-favorite/:userId/:toyListingId",
  favoriteToyController.checkFavorite
);

router.delete("/:id", favoriteToyController.deleteFavoriteToy);

module.exports = router;
