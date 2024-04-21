// // src/controller/imageController.js
// const multer = require("multer");
// const path = require("path");
// require("dotenv").config();

// // Setup for multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
//     );
//   },
// });

// const upload = multer({ storage: storage });

// // Function to upload a single image
// exports.uploadSingleImage = upload.single("image");

// // Function to handle the response after uploading an image

// exports.uploadImage = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "No file uploaded.",
//     });
//   }

//   const file = req.file;
//   const baseUrl = process.env.IMAGE_UPLOAD_BASE_URL;
//   const fileUrl = `${baseUrl}${file.filename}`; // Construct the full URL dynamically

//   res.status(201).json({
//     success: true,
//     message: "Image uploaded successfully.",
//     file: {
//       name: file.filename,
//       size: file.size,
//       type: file.mimetype,
//       url: fileUrl,
//     },
//   });
// };

// // Function to retrieve an image
// exports.getImage = (req, res) => {
//   const filename = req.params.filename;
//   const filepath = path.join(__dirname, "../../uploads", filename);
//   res.sendFile(filepath, (err) => {
//     if (err) {
//       return res.status(404).send({
//         success: false,
//         message: "Image not found.",
//       });
//     }
//   });
// };

// src/controller/imageController.js
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const path = require("path");

// Set up Google Cloud Storage
const storage = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
});
const bucket = storage.bucket(process.env.BUCKET_NAME);

// Multer configuration for handling memory storage
const multerStorage = multer.memoryStorage();

// Initialize multer with memory storage
const upload = multer({ storage: multerStorage });

exports.uploadSingleImage = upload.single("image");

// Function to handle the response after uploading an image
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  try {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      res.status(500).json({
        success: false,
        message: "Failed to upload the image.",
        error: err.message,
      });
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(201).json({
        success: true,
        message: "Image uploaded successfully.",
        file: {
          name: blob.name,
          size: req.file.size,
          type: req.file.mimetype,
          url: publicUrl,
        },
      });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Function to retrieve an image
exports.getImage = (req, res) => {
  const filename = req.params.filename;
  const file = bucket.file(filename);

  file
    .getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    })
    .then((signedUrls) => {
      res.redirect(signedUrls[0]); // This will redirect to the URL for the image.
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Image not found.",
        error: err.message,
      });
    });
};
