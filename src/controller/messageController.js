const Message = require("../../models/Message.js");

// Function to create a new listing
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

// Function to get all ToyListings
exports.getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
