const User = require("../../models/User.js");

// Function to create a new user
const createUser = async (req, res) => {
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
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
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

// const getAllUsers = async (req, res) => {
//   try {
//     const pipeline = [
//       {
//         $lookup: {
//           from: "User",
//           localField: "created_by_id",
//           foreignField: "_id",
//           as: "created_by",
//         },
//       },
//       {
//         $unwind: "$created_by",
//       },
//       {
//         $lookup: {
//           from: "User",
//           localField: "modified_by_id",
//           foreignField: "_id",
//           as: "modified_by",
//         },
//       },
//       {
//         $unwind: "$modified_by",
//       },
//       {
//         $project: {
//           email: 1,
//           first_name: 1,
//           last_name: 1,
//           profile_picture: 1,
//           nickname: 1,
//           zipcode: 1,
//           created_by: {
//             $concat: ["$created_by.first_name", " ", "$created_by.last_name"],
//           },
//           modified_by: {
//             $concat: ["$modified_by.first_name", " ", "$modified_by.last_name"],
//           },
//           created_date: 1,
//           modified_date: 1,
//         },
//       },
//     ];

//     const aggregatedUsers = await User.aggregate(pipeline);
//     res.status(200).json(aggregatedUsers);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
};
