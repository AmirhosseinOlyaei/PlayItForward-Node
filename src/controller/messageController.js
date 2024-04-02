const Message = require("../../models/message.js");
const User = require("../../models/User.js");
const ToyListing = require("../../models/ToyListing.js");

// Function to create a message
exports.sendMessage = async (req, res) => {
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
exports.getMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id)
      .populate({
        path: "user_id_from",
        select: "email first_name nickname",
        model: User,
      })
      .populate({
        path: "user_id_to",
        select: "email first_name nickname",
        model: User,
      })
      .populate({
        path: "toy_listing_id",
        select: "title description zipcode",
        model: ToyListing,
      })
      .exec();

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
