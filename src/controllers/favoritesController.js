const Favorite = require("../models/favorites");

const createFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create(req.body);
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    await favorite.remove();
    res.status(200).json("Favorite has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createFavorite,
  deleteFavorite,
  getFavorite,
  getAllFavorites,
};
