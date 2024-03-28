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
    created_by_id
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
  condition: {
    type: String,
    required: [true, "Condition is required"],
  },
  delivery_method: {
    type: String,
    required: [true, "Delivery method is required"],
  },
  // pictures: {
  //     type: String,
  //     required: [true, "Pictures are required"],
  // }
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ToyListing", toyListingSchema);
