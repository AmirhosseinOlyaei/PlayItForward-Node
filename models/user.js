// models/user.js
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
// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
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
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  nickname: {
    type: String,
    unique: true,
  },
  profile_picture: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  favoriteToys: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ToyListing",
  },
  created_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  termsAndConditions: {
    type: Boolean,
    default: false,
  },
  dateAgreed: {
    type: Date,
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

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Validate password
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
