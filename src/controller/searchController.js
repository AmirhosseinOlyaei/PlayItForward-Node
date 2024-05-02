// src/controller/searchController.js
// const User = require("../../models/User.js");
// const ToyListing = require("../../models/ToyListing.js");

// exports.searchFields = async (req, res) => {
//   try {
//     const dataUser = await User.find({
//       $or: [
//         { first_name: { $regex: req.params.keyword, $options: "i" } },
//         { last_name: { $regex: req.params.keyword, $options: "i" } },
//         { email: { $regex: req.params.keyword, $options: "i" } },
//         { nickname: { $regex: req.params.keyword, $options: "i" } },
//         { zipCode: { $regex: req.params.keyword, $options: "i" } },
//       ],
//     });
//     const dataToyListing = await ToyListing.find({
//       $or: [
//         { title: { $regex: req.params.keyword, $options: "i" } },
//         { description: { $regex: req.params.keyword, $options: "i" } },
//         { status: { $regex: req.params.keyword, $options: "i" } },
//         { category: { $regex: req.params.keyword, $options: "i" } },
//         { zip_code: { $regex: req.params.keyword, $options: "i" } },
//       ],
//     });

//     // Correct way to set status and send data in the response
//     res.status(200).json({ dataUser, dataToyListing });
//   } catch (error) {
//     res.status(500).json({ message: error.message || "error retrieving data" });
//   }
// };

const User = require("../../models/user");
const ToyListing = require("../../models/ToyListing.js");

exports.searchFields = async (req, res) => {
  try {
    let dataToyListing = [];
    if (req.params.keyword.trim()) {
      const searchRegex = new RegExp(req.params.keyword, "i");
      dataToyListing = await ToyListing.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { category: { $regex: searchRegex } },
          { zip_code: { $regex: searchRegex } },
          // Add any other relevant fields
        ],
      });
    } else {
      // Fetch and return all listings if no search term is provided
      dataToyListing = await ToyListing.find({});
    }
    res.status(200).json({ dataToyListing });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error retrieving data" });
  }
};
