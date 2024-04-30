/*
Message:
    user_id_from
    user_id_to
    toy_listing_id
    content
    sent_date
Route:
    CREATE
    GET
*/
const { profile } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user_id_from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //required: [true, "User id from is required"],
  },
  user_id_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //required: [true, "User id to is required"],
  },
  profile_picture: {
    type: String,
  },
  toy_listing_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToyListing",
    //required: [true, "Toy listing id is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  sent_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema); // creates Message model
