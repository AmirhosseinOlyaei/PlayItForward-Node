const Message = require("../../models/Message");
const createMessage = async (req, res) => {
  const message = new Message(req.body);
  try {
    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessage = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "user_id_from",
          foreignField: "_id",
          as: "from_user",
        },
      },
      {
        $unwind: "$from_user",
      },
      {
        $lookup: {
          from: "User",
          localField: "user_id_to",
          foreignField: "_id",
          as: "to_user",
        },
      },
      {
        $unwind: "$to_user",
      },
      {
        $lookup: {
          from: "Toy",
          localField: "toy_listing_id",
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
          user_id_from: 1,
          from_user_name: {
            $concat: ["$from_user.first_name", " ", "$from_user.last_name"],
          },
          user_id_to: 1,
          to_user_name: {
            $concat: ["$to_user.first_name", " ", "$to_user.last_name"],
          },
          toy_id: 1,
          toy_name: "$toy.title",
          content: 1,
          sent_date: 1,
        },
      },
    ];

    const aggregatedMessage = await Message.aggregate(pipeline);
    res.status(200).json(aggregatedMessage[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllMessages = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "User",
          localField: "user_id_from",
          foreignField: "_id",
          as: "from_user",
        },
      },
      {
        $unwind: "$from_user",
      },
      {
        $lookup: {
          from: "User",
          localField: "user_id_to",
          foreignField: "_id",
          as: "to_user",
        },
      },
      {
        $unwind: "$to_user",
      },
      {
        $lookup: {
          from: "Toy",
          localField: "toy_listing_id",
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
          user_id_from: 1,
          from_user_name: {
            $concat: ["$from_user.first_name", " ", "$from_user.last_name"],
          },
          user_id_to: 1,
          to_user_name: {
            $concat: ["$to_user.first_name", " ", "$to_user.last_name"],
          },
          toy_id: 1,
          toy_name: "$Toy.title",
          content: 1,
          sent_date: 1,
        },
      },
    ];

    const aggregatedMessages = await Message.aggregate(pipeline);
    res.status(200).json(aggregatedMessages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getMessage,
  getAllMessages,
};
