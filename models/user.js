const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  // GeoJSON is a format for storing geographic points and polygons.
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  exchangeMethod: {
    type: String,
    enum: ["pickup", "drop-off"],
    required: true,
  },
});

module.exports = mongoose.model("USer", userSchema);
