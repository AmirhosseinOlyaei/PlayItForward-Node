const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Cars",
      "Dolls",
      "Plush",
      "Playsets",
      "Sports Toys",
      "Art & Craft",
      "Games & Puzzles",
      "Books",
      "Musical instruments",
      "Miscellaneous",
    ],
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
