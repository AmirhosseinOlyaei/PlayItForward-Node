const express = require("express");
const router = express.Router();
const favoriteToyController = require("../controller/favoriteToyController.js");

// Define routes
router.post("/", favoriteToyController.addFavoriteToy);
router.get("/:userId", favoriteToyController.getFavoritesByUser);
// Route to check if a toy listing is in the user's favorites
router.get(
  "/check-favorite/:userId/:toyListingId",
  favoriteToyController.checkFavorite
);

router.delete("/:favoriteToyId", favoriteToyController.deleteFavoriteToy);

module.exports = router;
