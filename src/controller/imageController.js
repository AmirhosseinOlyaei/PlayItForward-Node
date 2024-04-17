const multer = require("multer");
const path = require("path");
require("dotenv").config();

// Setup for multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });

// Function to upload a single image
exports.uploadSingleImage = upload.single("image");

// Function to handle the response after uploading an image

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  const file = req.file;
  const baseUrl = process.env.IMAGE_UPLOAD_BASE_URL;
  const fileUrl = `${baseUrl}${file.filename}`; // Construct the full URL dynamically

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
    file: {
      name: file.filename,
      size: file.size,
      type: file.mimetype,
      url: fileUrl,
    },
  });
};

// Function to retrieve an image
exports.getImage = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../../uploads", filename);
  res.sendFile(filepath, (err) => {
    if (err) {
      return res.status(404).send({
        success: false,
        message: "Image not found.",
      });
    }
  });
};
