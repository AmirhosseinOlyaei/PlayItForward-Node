const express = require("express");

const router = express.Router();

const {
  createFavorite,
  getFavorite,
  getAllFavorites,
  deleteFavorite,
} = require("../controllers/favoritesController.js");

router.post("/favorites", createFavorite);
router.get("/favorites/:id", getFavorite);
router.get("/favorites", getAllFavorites);
router.delete("/favorites/:id", deleteFavorite);

module.exports = router;
