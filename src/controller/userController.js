const User = require("../../models/User.js");
const mongoose = require("mongoose");

// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "starsystems", // the name of the collection in the database
          localField: "_id",
          foreignField: "user_id_given_to", //field in the StarSystem model to match with
          as: "averageRating", // alias for the resulting array containing the average rating
        },
      },
      {
        $project: {
          _id: 0,
          email: 1,
          first_name: 1,
          last_name: 1,
          profile_picture: 1,
          nickname: 1,
          zipcode: 1,
          // created_by_id: 1,
          create_date: 1,
          modified_date: 1,
          // modified_by_id: 1,
          averageReviewStars: {
            $avg: "$averageRating.number_of_stars",
          },
        },
      },
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
