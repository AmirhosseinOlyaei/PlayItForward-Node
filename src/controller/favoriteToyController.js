const FavoriteToy = require("../../models/FavoriteToy.js");

// Function to create a new favorite toy
exports.addFavoriteToy = async (req, res) => {
  try {
    const newFavoriteToy = await FavoriteToy.create(req.body);
    res.status(201).json(newFavoriteToy);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get all favorite toys
exports.getAllFavoriteToys = async (req, res) => {
  try {
    const FavoriteToys = await FavoriteToy.find();
    res.status(200).json(FavoriteToys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a favorite toy
exports.deleteFavoriteToy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteFavoriteToy = await FavoriteToy.findByIdAndDelete(id);
    if (!deleteFavoriteToy) {
      return res
        .status(404)
        .json({ message: "Favorite Toy Listing not found" });
    }
    res.status(200).json({ message: "Favorite Toy Listing deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
