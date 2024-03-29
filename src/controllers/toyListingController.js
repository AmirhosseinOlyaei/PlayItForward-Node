const ToyListing = require("../../models/ToyListing.js");
//const Favorite = require("../../models/Favorite.js");

// Function to create a new toy listing
const createToyListing = async (req, res) => {
  try {
    const newListing = await ToyListing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get a single toy listing
const getToyListing = async (req, res) => {
  try {
    const listing = await ToyListing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all toy listings
const getAllToyListings = async (req, res) => {
  try {
    const listings = await ToyListing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a toy listing
const updateToyListing = async (req, res) => {
  const { id } = req.params;

  try {
    const updateToyListing = await ToyListing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateToyListing) {
      return res.status(404).json({ message: "Toy Listing not found" });
    }
    res.status(200).json(updateToyListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a toy listing
const deleteToyListing = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteToyListing = await ToyListing.findByIdAndDelete(id);
    if (!deleteToyListing) {
      return res.status(404).json({ message: "Toy Listing not found" });
    }
    res.status(200).json({ message: "Toy Listing deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get a toy listing view (Pipeline aggregation)
// ToyListing.aggregate([
//   { $match: { _id: toy_listing_id } }, // Match the toy listing
//   {
//     $lookup: {
//       from: "FavoriteToy",
//       localField: "_id",
//       foreignField: "toy_listing_id",
//       as: "favorites",
//     },
//   },
//   {
//     $lookup: {
//       from: "StarSystem",
//       localField: "_id",
//       foreignField: "toyListingId",
//       as: "starSystems",
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//       title: 1,
//       favoritesCount: { $size: "$favorites" },
//       starRating: { $avg: "$starSystems.rating" },
//     },
//   },
// ]);

module.exports = {
  createToyListing,
  getToyListing,
  getAllToyListings,
  updateToyListing,
  deleteToyListing,
};
