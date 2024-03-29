/*
Request:
    toy_listing_id
    user_id_of_the_user_requested
    date_requested
Route:
    CREATE
    GET: request from specific toy listing id
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestToySchema = new Schema({
  date_requested: {
    type: Date,
    default: Date.now,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toyRequested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToyListing",
  },
});

module.exports = mongoose.model("RequestToy", requestToySchema); // Creates Request Toy model
