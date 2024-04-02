const ToyListing = require("../../models/ToyListing.js");

// Function to get all ToyListings with aggregation
exports.getToyDetailsWithAggregation = async (toyListingId) => {
  try {
    const toy = await ToyListing.aggregate([
      {
        $match: { _id: toyListingId },
      },
      {
        $lookup: {
          from: "users",
          localField: "posted_by_user_id",
          foreignField: "_id",
          as: "owner",
        },
      },
    ]);
    return toy;
  } catch (error) {
    throw error;
  }
};
