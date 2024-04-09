const ToyListing = require("../../models/ToyListing.js");
const User = require("../../models/User.js");

// Function to create a new listing
exports.createToyListing = async (req, res) => {
  try {
    // Create the toy listing with the request body
    let newToyListing = new ToyListing(req.body);
    await newToyListing.save();

    // Now populate the lister's information
    newToyListing = await ToyListing.findById(newToyListing._id)
      .populate("listed_by_id", "first_name last_name email") // Adjust the fields you want to populate
      .exec();

    // Respond with the new toy listing, including the populated lister information
    res.status(201).json(newToyListing);
  } catch (error) {
    // Handle errors, such as validation errors or database errors
    res.status(400).json({ message: error.message });
  }
};

// Function to get a single toy listing
exports.getToyListing = async (req, res) => {
  try {
    // Query ToyListing by ID and populate the created_by_id field to fetch the associated user's information
    const listing = await ToyListing.findById(req.params.id)
      .populate({
        path: "listed_by_id",
        select: "email first_name last_name profile_picture",
      })
      .populate({
        path: "modified_by_id",
        select: "email first_name last_name profile_picture",
      })
      .populate({
        path: "given_to_user_id",
        select: "email first_name last_name profile_picture",
      })
      .exec();
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

// Function to get all ToyListings and populate the user's information
exports.getAllToyListings = async (req, res) => {
  try {
    const listings = await ToyListing.find()
      .populate({
        path: "listed_by_id",
        select: "email first_name last_name profile_picture",
      })
      .populate({
        path: "modified_by_id",
        select: "email first_name last_name profile_picture",
      })
      .populate({
        path: "given_to_user_id",
        select: "email first_name last_name profile_picture",
      })
      .exec();
    res.status(200).json(listings);
  } catch (error) {}
};
// Function to get all ToyListings

// exports.getAllToyListings = async (req, res) => {
//   try {
//     const listings = await ToyListing.find();
//     res.status(200).json(listings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
