// src/controller/toyListingController.js
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

// Populate options defined at a central place
const populateOptions = [
  {
    path: "listed_by_id",
    select: "email first_name last_name profile_picture",
  },
  {
    path: "modified_by_id",
    select: "email first_name last_name profile_picture",
  },
  {
    path: "given_to_user_id",
    select: "email first_name last_name profile_picture",
  },
];

exports.getAllToyListings = async (req, res) => {
  const { delivery_method, zipCodes, categories, search } = req.query;
  try {
    const query = { status: { $in: ["available", "reserved"] } };

    if (delivery_method && delivery_method !== "All") {
      query.delivery_method = delivery_method;
    }

    if (zipCodes) {
      const zipCodesArray = zipCodes.split(",");
      query.zip_code = { $in: zipCodesArray };
    }

    if (categories) {
      const categoryArray = categories.split(",");
      const validCategories = ToyListing.schema.path("category").enumValues;
      const invalidCategories = categoryArray.filter(
        (cat) => !validCategories.includes(cat)
      );

      if (invalidCategories.length > 0) {
        return res.status(400).json({
          message: "Invalid categories: " + invalidCategories.join(", "),
        });
      }

      query.category = { $in: categoryArray };
    }

    // Adding search functionality
    if (search && search.trim() !== "") {
      // Ensure your MongoDB collection has a text index on fields you want to search
      query.$text = { $search: search };
    }

    const listings = await ToyListing.find(query)
      .populate(populateOptions)
      .exec();

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching toy listings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update a toy listing
exports.updateToyListing = async (req, res) => {
  const { id } = req.params; // Assuming the ID of the toy listing to update is passed as a URL parameter

  try {
    // Step 1: Update the toy listing with the request body
    // Note: { new: true } option returns the document after update was applied
    let updatedToyListing = await ToyListing.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedToyListing) {
      return res.status(404).json({ message: "Toy listing not found" });
    }

    // Step 2: Populate the listed_by_id field with the lister's information
    updatedToyListing = await ToyListing.findById(updatedToyListing._id)
      .populate("listed_by_id", "first_name last_name email") // Adjust fields as necessary
      .exec();

    // Step 3: Respond with the updated toy listing, including the populated lister's information
    res.status(200).json(updatedToyListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

//get enum values for a specific field

exports.getEnumValues = async (req, res) => {
  const fieldName = req.params.fieldName;
  const enumValues = ToyListing.schema.path(fieldName).enumValues;

  if (enumValues) {
    res.send(enumValues);
  } else {
    res.status(404).json({ message: "Field not found" });
  }
};

// Fetch categories
exports.getCategories = (req, res) => {
  // Assuming categories are fixed, we directly send the enum values
  res.json(ToyListing.schema.path("category").enumValues);
};
