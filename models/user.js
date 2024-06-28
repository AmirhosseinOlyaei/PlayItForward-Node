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
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  nickname: {
    type: String,
    unique: true,
  },
  profile_picture: String,
  zipCode: String,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
