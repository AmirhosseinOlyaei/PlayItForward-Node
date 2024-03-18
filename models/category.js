const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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

module.exports = mongoose.model("Category", categorySchema);
