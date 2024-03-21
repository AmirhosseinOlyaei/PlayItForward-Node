const Favorite = require("../../models/Favorites");

const createFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.create(req.body);
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllFavorites = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "Toy",
          localField: "toy_id",
          foreignField: "_id",
          as: "toy",
        },
      },
      {
        $unwind: "$toy",
      },
      {
        $project: {
          _id: 0,
          user_id: 1,
          user_name: { $concat: ["$user.first_name", " ", "$user.last_name"] },
          toy_id: 1,
          toy_name: "$Toy.title",
          toy_description: "$Toy.description",
        },
      },
    ];

    const aggregatedFavorites = await Favorite.aggregate(pipeline);
    res.status(200).json(aggregatedFavorites);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    await favorite.remove();
    res.status(200).json("Favorite has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createFavorite,
  deleteFavorite,
  getFavorite,
  getAllFavorites,
};
