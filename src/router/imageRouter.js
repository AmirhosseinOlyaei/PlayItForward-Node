// src/router/imageRouter.js
// const express = require("express");
// const router = express.Router();
// const imageController = require("../controller/imageController");

// // Route for uploading an image
// router.post(
//   "/upload",
//   imageController.uploadSingleImage,
//   imageController.uploadImage
// );

// // Route for retrieving an image
// router.get("/upload/:filename", imageController.getImage);

// module.exports = router;

const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");

// Route for uploading an image
router.post(
  "/upload",
  imageController.uploadSingleImage,
  imageController.uploadImage
);

// Updated route for retrieving an image to reflect that it's getting an image, not uploading
router.get("/images/:filename", imageController.getImage);

module.exports = router;
