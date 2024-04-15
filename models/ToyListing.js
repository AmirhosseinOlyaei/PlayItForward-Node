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
    listed_by_id
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
      "Arts & Crafts",
      "Books",
      "Cars",
      "Dolls",
      "Clothes",
      "Plush",
      "Sports",
      "Playsets",
      "Health",
      "Educational Toys",
      "Outdoor Play",
      "Games",
      "Puzzles",
      "Electronic Toys",
      "Action Figures",
      "Building Blocks",
      "Musical instruments",
      "Baby and Toddler Toys",
      "Costumes and Pretend Play",
      "Miscellaneous",
    ],
    required: [true, "category is required"],
  },
  zip_code: {
    type: String,
    required: [true, "Zip code is required"],
  },
  delivery_method: {
    type: String,
    enum: ["Pickup", "Delivery"],
    required: [true, "Delivery method is required"],
  },
  condition: {
    type: String,
    enum: ["New", "Like-new", "Lightly-used", "Heavily-used"],
  },
  listed_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: [true, "Listed by is required"],
  },
  given_to_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imageUrl: {
    type: String,
    required: true,
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
