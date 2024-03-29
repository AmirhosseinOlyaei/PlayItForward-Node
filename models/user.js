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
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema); // Creates User model
