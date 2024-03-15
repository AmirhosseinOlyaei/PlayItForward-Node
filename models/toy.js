const mongoose = require("mongoose");

const toySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  toyName: {
    type: String,
    required: true,
  },
  toyImage: {
    type: String,
    required: true,
  },
  toyDescription: {
    type: String,
    required: true,
  },
  toyCategory: {
    type: String,
    required: true,
  },
  exchangeMethod: {
    type: String,
    enum: ["pickup", "drop-off"],
    required: true,
  },
});

module.exports = mongoose.model("Toy", toySchema);
