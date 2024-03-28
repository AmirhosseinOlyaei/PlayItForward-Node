/*
Favorites:
    toy_listing_id
    user_id
    time_stamp
Route:
    CREATE
    GET
    DELETE
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteToySchema = new Schema({
  toy_listing_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToyListing",
    required: [true, "Toy listing id is required"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  time_stamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("FavoriteToy", FavoriteToySchema); // creates Favorite Toy model
