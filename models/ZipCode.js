// src/models/ZipCode.js
const mongoose = require("mongoose");

const zipCodeSchema = new mongoose.Schema({
  placeId: String,
  zipCodes: [String],
});

const ZipCode = mongoose.model("ZipCode", zipCodeSchema);

module.exports = ZipCode;
