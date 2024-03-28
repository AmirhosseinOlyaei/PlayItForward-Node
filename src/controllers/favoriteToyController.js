const FavoriteToy = require("../../models/Favorite");

// Function to add a new fovorite toy
const addFavoriteToy = async (req, res) => {
  try {
    const newFavoriteToy = await FavoriteToy.create(req.body);
    res.status(201).json(newFavoriteToy);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get a single favorite
const getFavorite = async (req, res) => {
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
const getAllFavoriteToys = async (req, res) => {
  try {
    const FavoriteToys = await FavoriteToy.find();
    res.status(200).json(FavoriteToys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all favorite toys
// const getAllFavoritesToys = async (req, res) => {
//   try {
//     const pipeline = [
//       {
//         $lookup: {
//           from: "User",
//           localField: "user_id",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       {
//         $unwind: "$user",
//       },
//       {
//         $lookup: {
//           from: "Toy",
//           localField: "toy_id",
//           foreignField: "_id",
//           as: "toy",
//         },
//       },
//       {
//         $unwind: "$toy",
//       },
//       {
//         $project: {
//           _id: 0,
//           user_id: 1,
//           user_name: { $concat: ["$user.first_name", " ", "$user.last_name"] },
//           toy_id: 1,
//           toy_name: "$Toy.title",
//           toy_description: "$Toy.description",
//         },
//       },
//     ];

//     const aggregatedFavorites = await Favorite.aggregate(pipeline);
//     res.status(200).json(aggregatedFavorites);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const deleteFavoriteToy = async (req, res) => {
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

module.exports = {
  addFavoriteToy,
  getAllFavoriteToys,
  deleteFavoriteToy,
  getFavorite,
};
