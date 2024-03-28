const Message = require("../../models/Message");

// Function to create a new message
const sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get a single message
const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all messages
const getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getMessage = async (req, res) => {
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
//           localField: "user_id_from",
//           foreignField: "_id",
//           as: "from_user",
//         },
//       },
//       {
//         $unwind: "$from_user",
//       },
//       {
//         $lookup: {
//           from: "User",
//           localField: "user_id_to",
//           foreignField: "_id",
//           as: "to_user",
//         },
//       },
//       {
//         $unwind: "$to_user",
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
//           user_id_from: 1,
//           from_user_name: {
//             $concat: ["$from_user.first_name", " ", "$from_user.last_name"],
//           },
//           user_id_to: 1,
//           to_user_name: {
//             $concat: ["$to_user.first_name", " ", "$to_user.last_name"],
//           },
//           toy_id: 1,
//           toy_name: "$toy.title",
//           content: 1,
//           sent_date: 1,
//         },
//       },
//     ];

//     const aggregatedMessage = await Message.aggregate(pipeline);
//     res.status(200).json(aggregatedMessage[0]);
//   } catch (err) {
//     res.status(500).json(err);
//   }
//};
// const getAllMessages = async (req, res) => {
//   try {
//     const pipeline = [
//       {
//         $lookup: {
//           from: "User",
//           localField: "user_id_from",
//           foreignField: "_id",
//           as: "from_user",
//         },
//       },
//       {
//         $unwind: "$from_user",
//       },
//       {
//         $lookup: {
//           from: "User",
//           localField: "user_id_to",
//           foreignField: "_id",
//           as: "to_user",
//         },
//       },
//       {
//         $unwind: "$to_user",
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
//           user_id_from: 1,
//           from_user_name: {
//             $concat: ["$from_user.first_name", " ", "$from_user.last_name"],
//           },
//           user_id_to: 1,
//           to_user_name: {
//             $concat: ["$to_user.first_name", " ", "$to_user.last_name"],
//           },
//           toy_id: 1,
//           toy_name: "$Toy.title",
//           content: 1,
//           sent_date: 1,
//         },
//       },
//     ];

//     const aggregatedMessages = await Message.aggregate(pipeline);
//     res.status(200).json(aggregatedMessages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

module.exports = {
  sendMessage,
  getMessage,
  getAllMessages,
};
