const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  toy_listing_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Toy",
  },
  user_id_of_the_user_requested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date_requested: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
