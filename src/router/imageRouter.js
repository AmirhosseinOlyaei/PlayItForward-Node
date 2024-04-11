const express = require("express");
const router = express.Router();
const {
  uploadSingleImage,
  uploadImage,
} = require("../controller/imageController");

// Route to handle image upload
router.post("/upload", uploadSingleImage, uploadImage);

module.exports = router;
