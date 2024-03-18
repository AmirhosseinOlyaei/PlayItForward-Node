const mongoose = require("mongoose");

const starSchema = mongoose.Schema({
  user_id_given_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user_id_given_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  number_of_stars: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", starSchema);
