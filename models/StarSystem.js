/*
Star System:
    user_id_given_by
    user_id_given_to
    number_of_stars
    created_date
Route:
    CREATE
    GET
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const starSystemSchema = new Schema({
  user_id_given_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user_id_given_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id to is required"],
  },
  toy_listing_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToyListing",
    required: [true, "Toy listing id is required"],
  },
  number_of_stars: {
    type: Number,
    required: [true, "Number of stars is required"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StarSystem", starSystemSchema); // creates User model
