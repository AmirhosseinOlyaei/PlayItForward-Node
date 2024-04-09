const User = require("../../models/User.js");
const ToyListing = require("../../models/ToyListing.js");
const FavoriteToy = require("../../models/FavoriteToy.js");

exports.addFavoriteToy = async (req, res) => {
  try {
    const { user_id, toy_listing_id } = req.body;

    // Validate that both the user and toy listing exist
    const userExists = await User.findById(user_id);
    const toyListingExists = await ToyListing.findById(toy_listing_id);
    if (!userExists || !toyListingExists) {
      return res.status(404).json({ message: "User or Toy Listing not found" });
    }

    // Assuming your schema fields are actually named 'user' and 'toyListing'
    const newFavoriteToy = await FavoriteToy.create({
      user_id: user_id,
      toy_listing_id: toy_listing_id,
    });

    // Find the newly created document and populate the necessary fields
    const populatedFavoriteToy = await FavoriteToy.findById(newFavoriteToy._id)
      .populate("user_id", "first_name last_name email profile_picture")
      .populate("toy_listing_id", "title description pictures")
      .exec(); // Use execPopulate since we're calling populate on a document, not a query

    res.status(201).json(populatedFavoriteToy);
  } catch (error) {
    console.error(error); // Log the full error to your server's console for debugging
    res.status(400).json({ message: error.message });
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

// Function to get a favorite toy by user id
exports.getFavoriteToyByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const favoriteToy = await FavoriteToy.findOne({ user_id: id })
      .populate({
        path: "user_id",
        select: "email first_name last_name nickname profile_picture",
        model: "User",
      })
      .exec();
    if (!favoriteToy) {
      return res
        .status(404)
        .json({ message: "Favorite Toy not found for the given user" });
    }
    res.status(200).json(favoriteToy);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
