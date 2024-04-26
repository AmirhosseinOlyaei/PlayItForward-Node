// src/controller/imageController.js
// ---local storage---
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
// ---google cloud storage---
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const Multer = require("multer");
const { Readable } = require("stream");

// Configure multer for in-memory storage of files
const upload = Multer({
  storage: Multer.memoryStorage(),
});
exports.uploadSingleImage = upload.single("file");

// Initialize the Google Cloud Storage client with credentials from the JSON file
const storage = new Storage({
  keyFilename: "./playitforward-418316-e1fd86d0d14f.json", // Path relative to the root of your Node.js application
});
const bucket = storage.bucket(process.env.BUCKET_NAME);

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileBuffer = req.file.buffer;
  const fileStream = new Readable({
    read() {},
  });
  fileStream.push(fileBuffer);
  fileStream.push(null); // Signal the end of the stream

  const destinationPath = req.file.originalname;
  const writeStream = bucket.file(destinationPath).createWriteStream({
    resumable: false,
    // private: true,
    contentType: "auto",
  });

  writeStream.on("error", (err) => {
    console.error(`Error uploading image: ${err}`);
    res.status(500).send("Error uploading image.");
  });

  writeStream.on("finish", () => {
    // Generate a signed URL for secure access
    const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    bucket.file(destinationPath).getSignedUrl(options, (err, url) => {
      if (err) {
        console.error(`Error generating signed URL: ${err}`);
        return res.status(500).send("Error generating signed URL.");
      }
      res.status(200).send({ url }); // Send the signed URL as a response
    });
  });

  fileStream.pipe(writeStream);
};

exports.getImage = async (req, res) => {
  const { filename } = req.params;
  const options = {
    action: "read",
    expires: Date.now() + 5 * 60 * 1000, // URL expires in 5 minutes
  };

  bucket.file(filename).getSignedUrl(options, (err, url) => {
    if (err) {
      console.error(`Error retrieving file: ${err}`);
      return res.status(500).send("Error retrieving file.");
    }
    res.redirect(url); // Redirect to the signed URL
  });
};
