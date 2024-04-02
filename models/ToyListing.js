/*
Toy Listing:

    given_to_user_id
    title
    description
    condition
    delivery_method
    pictures
    category
    zip_code
    status
    created_by_user_id
    create date
    modified_date
    modified_by_id
Route:
    CREATE
    UPDATE
    GET: ability to pass filter
    DELETE
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toyListingSchema = new Schema({
  given_to_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  status: {
    type: String,
    enum: ["available", "reserved", "gone"],
    default: "available",
  },
  category: {
    type: String,
    enum: [
      "Action Figures",
      "Board Games",
      "Building Blocks",
      "Card Games",
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
    required: [true, "category is required"],
  },
  delivery_method: {
    type: String,
    enum: ["Pickup", "Delivery"],
    required: [true, "Delivery method is required"],
  },
  condition: {
    type: String,
    enum: ["New", "Like-new", "Lightly-used", "Heavily-used"],
    required: [true, "Condition is required"],
  },
  pictures: {
    type: String,
    required: [true, "Pictures are required"],
  },

  posted_by_user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  zip_code: {
    type: String,
    required: [true, "Zip code is required"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ToyListing", toyListingSchema); // creates Toy Listing model
