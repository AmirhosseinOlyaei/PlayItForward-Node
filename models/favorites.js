const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Toy",
  },
  time_stamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
