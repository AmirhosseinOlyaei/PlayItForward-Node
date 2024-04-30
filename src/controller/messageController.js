const Message = require("../../models/message.js");
const User = require("../../models/user");
const ToyListing = require("../../models/ToyListing.js");

// Function to create a message and include user and toy listing information
exports.sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);

    const populatedMessage = await Message.findById(newMessage._id)
      .populate({
        path: "user_id_from",
        select: "email first_name last_name nickname profile_picture",
        model: User,
      })
      .populate({
        path: "user_id_to",
        select: "email first_name last_name nickname profile_picture",
        model: User,
      })
      .populate({
        path: "toy_listing_id",
        select: "title description zipcode",
        model: ToyListing,
      })
      .exec();
    console.log(populatedMessage);
    res.status(201).json(populatedMessage);
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
        select: "email first_name last_name nickname profile_picture",
        model: User,
      })
      .populate({
        path: "user_id_to",
        select: "email first_name last_name nickname profile_picture",
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
    console.log(message);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all messages with user details
exports.getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find()
      .populate({
        path: "user_id_from",
        select: "email first_name last_name nickname profile_picture",
        model: User,
      })
      .populate({
        path: "user_id_to",
        select: "email first_name last_name nickname profile_picture",
        model: User,
      })
      .populate({
        path: "toy_listing_id",
        select: "title description zipcode",
        model: ToyListing,
      })
      .exec();
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// exports.getAllMessages = async (req, res) => {
//   try {
//     const allMessages = await Message.find();
//     res.status(200).json(allMessages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Function to delete a message
exports.deleteMessage = async (req, res) => {
  const { id } = req.params; // Get the message ID from the request parameters
  try {
    const message = await Message.findByIdAndDelete(id); // Attempt to find and delete the message by ID

    if (!message) {
      return res.status(404).json({ message: "Message not found" }); // Message not found
    }

    // If the message is successfully found and deleted
    res.status(200).json({ message: "Message successfully deleted" });
  } catch (error) {
    // If an error occurs during the process
    res.status(500).json({ message: error.message });
  }
};
