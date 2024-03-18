const mongoose = require("mongoose");

const toySchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  given_to_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  delivery_method: {
    type: String,
    required: true,
  },
  pictures: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
  modified_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Toy", toySchema);
