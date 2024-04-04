const ToyListing = require("../../models/ToyListing.js");
const User = require("../../models/User.js");

// Function to create a new listing
exports.createToyListing = async (req, res) => {
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
exports.getToyListing = async (req, res) => {
  try {
    // Query ToyListing by ID and populate the created_by_id field to fetch the associated user's information
    const listing = await ToyListing.findById(req.params.id)
      .populate({
        path: "created_by_id",
        select: "email first_name last_name profile_picture", // Specify the fields you want to populate
      })
      .populate({
        path: "modified_by_id",
        select: "email first_name last_name profile_picture",
      });
    // If no listing found with the given ID
    if (!listing) {
      return res.status(404).json({ message: "Toy Listing not found" });
    }

    // Return the toy listing along with the user's details
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all ToyListings
exports.getAllToyListings = async (req, res) => {
  try {
    const listings = await ToyListing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a toy listing
exports.updateToyListing = async (req, res) => {
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
exports.deleteToyListing = async (req, res) => {
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
