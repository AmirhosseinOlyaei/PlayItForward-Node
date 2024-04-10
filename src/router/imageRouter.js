const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");
const multer = require("multer");
const upload = multer();

router.post("/upload", upload.single("image"), imageController.uploadImage);

module.exports = router;
