const User = require("../../models/user");
const ToyListing = require("../../models/ToyListing.js");
const FavoriteToy = require("../../models/FavoriteToy.js");

exports.addFavoriteToy = async (req, res) => {
  try {
    const { user_id, toy_listing_id } = req.body;

    // Check if the favorite already exists to avoid duplicates
    const existingFavorite = await FavoriteToy.findOne({
      user_id,
      toy_listing_id,
    });
    if (existingFavorite) {
      return res.status(409).json({ message: "Favorite already exists" });
    }

    // Create the new favorite if it doesn't exist
    const newFavoriteToy = await FavoriteToy.create({
      user_id: user_id,
      toy_listing_id: toy_listing_id,
    });

    // Optionally, populate details if needed for the response
    const populatedFavoriteToy = await FavoriteToy.findById(newFavoriteToy._id)
      .populate("user_id", "first_name last_name email profile_picture")
      .populate("toy_listing_id", "title description pictures")
      .exec(); // Use execPopulate if necessary

    res.status(201).json(populatedFavoriteToy);
  } catch (error) {
    console.error(error); // Log the full error
    res.status(400).json({ message: error.message });
  }
};

// Function to get a favorite toy by user id
exports.getFavoritesByUser = async (req, res) => {
  try {
    const favorites = await FavoriteToy.find({
      user_id: req.params.userId,
    }).populate("toy_listing_id");
    res.status(200).send(favorites);
  } catch (error) {
    res.status(404).send(error);
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

// Function to check if a toy listing is in the user's favorites
exports.checkFavorite = async (req, res) => {
  const { userId, toyListingId } = req.params; // Assuming you're passing these as URL parameters

  try {
    const favorite = await FavoriteToy.findOne({
      user_id: userId,
      toy_listing_id: toyListingId,
    });

    if (favorite) {
      return res
        .status(200)
        .json({ isFavorite: true, favorite_Id: favorite._id });
    } else {
      return res.status(200).json({ isFavorite: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error checking favorite", error: error.message });
  }
};

// exports.getFavoriteToysByUserId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const FavoriteToys = await FavoriteToy.find({ user_id: id });
//     res.status(200).json(FavoriteToys);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
