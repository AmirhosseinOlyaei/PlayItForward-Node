const StarSystem = require("../../models/StarSystem.js");
const mongoose = require("mongoose");
// Function to give stars
exports.createRating = async (req, res) => {
  const {
    user_id_given_by,
    user_id_given_to,
    toy_listing_id,
    number_of_stars,
  } = req.body;
  try {
    const existingRating = await StarSystem.findOne({
      user_id_given_by,
      user_id_given_to,
      toy_listing_id,
    });

    if (existingRating) {
      return res
        .status(400)
        .send({
          message: "You have already rated this user for this toy listing.",
        });
    }

    const newRating = new StarSystem({
      user_id_given_by,
      user_id_given_to,
      toy_listing_id,
      number_of_stars,
    });

    await newRating.save();
    res.status(201).send(newRating);
  } catch (error) {
    res.status(500).send({ message: "Error creating rating", error });
  }
};

/// Function to get average stars given to a specific user
exports.getAverageStarsGivenToUser = async (req, res) => {
  try {
    console.log("ID Parameter:", req.params.id); // Log the ID parameter
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const averageStars = await StarSystem.aggregate([
      {
        $match: {
          user_id_given_to: mongoose.Types.ObjectId.createFromHexString(
            req.params.id
          ),
        },
      },
      {
        $group: {
          _id: "$user_id_given_to",
          averageStars: { $avg: "$number_of_stars" },
          // totalStars: { $sum: "$number_of_stars" }, // Calculate total stars
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Unwind the user array created by lookup
      },
      {
        $project: {
          _id: 0, // Exclude _id from the output
          user_id: "$user._id",
          first_name: "$user.first_name",
          last_name: "$user.last_name",
          email: "$user.email",
          profile_picture: "$user.profile_picture",
          nickname: "$user.nickname",
          zipCode: "$user.zipCode",
          averageStars: 1,
          // totalStars: 0,
        },
      },
    ]);
    res.status(200).json(averageStars);
  } catch (error) {
    console.error(error); // Log any errors for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// // Function to get a single star
// exports.getStar = async (req, res) => {
//   try {
//     const star = await StarSystem.findById(req.params.id);
//     res.status(200).json(star);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Function to get all stars
// exports.getStars = async (req, res) => {
//   try {
//     const stars = await StarSystem.find();
//     res.status(200).json(stars);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
