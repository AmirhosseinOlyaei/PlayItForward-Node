/*
User:
    email
    first_name
    last_name
    profile_picture
    nickname
    zipcode
    created_by_id
    create_date
    modified_date
    modified_by_id
Route:
    CREATE
    UPDATE
    GET: ability to pass filter
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  profile_picture: {
    type: String,
    required: [true, "Profile picture is required"],
  },
  nickname: {
    type: String,
    required: [true, "Nickname is required"],
    unique: true,
  },
  zipCode: {
    type: String,
    required: [true, "Zipcode is required"],
  },
  created_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema); // creates User model
