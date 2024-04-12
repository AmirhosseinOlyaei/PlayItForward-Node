const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");

// Route for uploading an image
router.post(
  "/upload",
  imageController.uploadSingleImage,
  imageController.uploadImage
);

// Route for retrieving an image
router.get("/upload/:filename", imageController.getImage);

module.exports = router;
