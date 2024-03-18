const mongoose = require("mongoose");

const conditionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["New", "Like-new", "Good", "Poor"],
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  sort_order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Condition", conditionSchema);
