const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
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

module.exports = mongoose.model("Status", statusSchema);
