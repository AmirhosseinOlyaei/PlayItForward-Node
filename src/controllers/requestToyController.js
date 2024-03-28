const RequestToy = require("../../models/RequestToy.js");

// Function to create a toy request
const createToyRequest = async (req, res) => {
  try {
    const makeRequest = await RequestToy.create(req.body);
    res.status(201).json(makeRequest);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get all toy requests
const getAllToyRequests = async (req, res) => {
  try {
    const requests = await RequestToy.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all toy requests
// const getAllToyRequest = async (req, res) => {
//   try {
//     const pipeline = [
//       {
//         $match: {
//           _id: mongoose.Types.ObjectId(req.params.id),
//         },
//       },
//       {
//         $lookup: {
//           from: "User",
//           localField: "user_id_of_the_user_requested",
//           foreignField: "_id",
//           as: "user_requested",
//         },
//       },
//       {
//         $unwind: "$user_requested",
//       },
//       {
//         $lookup: {
//           from: "Toy",
//           localField: "toy_listing_id",
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
//           user_id_of_the_user_requested: 1,
//           user_requested_name: {
//             $concat: [
//               "$user_requested.first_name",
//               " ",
//               "$user_requested.last_name",
//             ],
//           },
//           toy_listing_id: 1,
//           toy_name: "$toy.title",
//           date_requested: 1,
//         },
//       },
//     ];

//     const aggregatedRequest = await Request.aggregate(pipeline);
//     res.status(200).json(aggregatedRequest[0]);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// const getAllRequests = async (req, res) => {
//   try {
//     const pipeline = [
//       {
//         $lookup: {
//           from: "User",
//           localField: "user_id_of_the_user_requested",
//           foreignField: "_id",
//           as: "user_requested",
//         },
//       },
//       {
//         $unwind: "$user_requested",
//       },
//       {
//         $lookup: {
//           from: "Toy",
//           localField: "toy_listing_id",
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
//           user_id_of_the_user_requested: 1,
//           user_requested_name: {
//             $concat: [
//               "$user_requested.first_name",
//               " ",
//               "$user_requested.last_name",
//             ],
//           },
//           toy_listing_id: 1,
//           toy_name: "$toy.title",
//           date_requested: 1,
//         },
//       },
//     ];

//     const aggregatedRequests = await Request.aggregate(pipeline);
//     res.status(200).json(aggregatedRequests);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

module.exports = {
  createToyRequest,
  getAllToyRequests,
};
