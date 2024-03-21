const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user_id_from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user_id_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toy_listing_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Toy",
  },
  content: {
    type: String,
    required: true,
  },
  sent_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
