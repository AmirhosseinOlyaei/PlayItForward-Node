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

// Amir's Google Cloud Storage code
// const multer = require("multer");
// const { Storage } = require("@google-cloud/storage");
// require("dotenv").config();
// const path = require("path");

// let storage, bucket;

// // Check if environment variables are set before using them
// if (
//   process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON &&
//   process.env.BUCKET_NAME
// ) {
//   // Initialize Google Cloud Storage with credentials
//   const credentials = JSON.parse(
//     process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
//   );
//   storage = new Storage({ credentials });
//   bucket = storage.bucket(process.env.BUCKET_NAME);
// } else {
//   console.error(
//     "Environment variables for Google Cloud credentials or bucket name are not set."
//   );
//   // Consider what your application should do in this error scenario.
//   // Maybe throw an error or handle it so that the application can still run in some capacity.
// }

// // Multer configuration for handling memory storage
// const multerStorage = multer.memoryStorage();

// // Initialize multer with memory storage
// const upload = multer({ storage: multerStorage });
// exports.uploadSingleImage = upload.single("image");

// // Function to handle the response after uploading an image
// exports.uploadImage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "No file uploaded.",
//     });
//   }

//   if (!bucket) {
//     return res.status(500).json({
//       success: false,
//       message: "Storage bucket is not configured.",
//     });
//   }

//   try {
//     const blob = bucket.file(req.file.originalname);
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });

//     blobStream.on("error", (err) => {
//       res.status(500).json({
//         success: false,
//         message: "Failed to upload the image.",
//         error: err.message,
//       });
//     });

//     blobStream.on("finish", () => {
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//       res.status(201).json({
//         success: true,
//         message: "Image uploaded successfully.",
//         file: {
//           name: blob.name,
//           size: req.file.size,
//           type: req.file.mimetype,
//           url: publicUrl,
//         },
//       });
//     });

//     blobStream.end(req.file.buffer);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Function to retrieve an image
// exports.getImage = (req, res) => {
//   if (!bucket) {
//     return res.status(500).json({
//       success: false,
//       message: "Storage bucket is not configured.",
//     });
//   }

//   const filename = req.params.filename;
//   const file = bucket.file(filename);

//   file
//     .getSignedUrl({
//       action: "read",
//       expires: "03-09-2491",
//     })
//     .then((signedUrls) => {
//       res.redirect(signedUrls[0]); // This will redirect to the URL for the image.
//     })
//     .catch((err) => {
//       res.status(404).json({
//         success: false,
//         message: "Image not found.",
//         error: err.message,
//       });
//     });
// };

// Marice's Google Cloud Storage code
// const { Storage } = require("@google-cloud/storage");
// require("dotenv").config();
// const upload = Multer({
//   storage: Multer.memoryStorage(),
// });
// exports.uploadSingleImage = upload.single("file");
// const storage = new Storage({
//   keyFilename: "playitforward-418316-e1fd86d0d14f.json",
// });
// const bucket = storage.bucket(process.env.BUCKET_NAME);
// const { Readable } = require("stream");
// exports.uploadImage = async (req, res) => {
//   console.log(req.file);
//   if (!req.file) {
//     console.log("no file uploaded");
//     return res.status(400).send("No file uploaded.");
//   }
//   // Access file data from req.file.buffer
//   const fileBuffer = req.file.buffer;
//   // Create a readable stream from the file buffer
//   const fileStream = new Readable();
//   fileStream.push(fileBuffer);
//   fileStream.push(null); // Signal the end of the stream
//   // Define the destination path in the bucket
//   const destinationPath = req.file.originalname;
//   // Create a writable stream to the destination path in the bucket
//   const writeStream = bucket.file(destinationPath).createWriteStream();
//   // Handle errors and completion of the stream
//   writeStream.on("error", (err) => {
//     console.error(`Error uploading image: ${err}`);
//     res.status(500).send("Error uploading image.");
//   });
//   writeStream.on("finish", () => {
//     console.log(`Image uploaded to ${bucket}.`);
//     // Make the file public
//     bucket.file(destinationPath).makePublic((err) => {
//       if (err) {
//         console.error(`Error making file public: ${err}`);
//         return res.status(500).send("Error making file public.");
//       }
//       console.log(`File ${destinationPath} is now public.`);
//       const publicUrl = `https://storage.googleapis.com/${bucket}/${destinationPath}`;
//       console.log(`Public URL for ${destinationPath}: ${publicUrl}`);
//       res.status(200).send(publicUrl); // Send the public URL as a response
//     });
//   });
//   // Pipe the file data from the readable stream to the writable stream
//   fileStream.pipe(writeStream);
// };

//Amir's code
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const Multer = require("multer");
const upload = Multer({
  storage: Multer.memoryStorage(),
});
exports.uploadSingleImage = upload.single("file");

const storage = new Storage({
  keyFilename: "playitforward-418316-e1fd86d0d14f.json",
});
const bucket = storage.bucket(process.env.BUCKET_NAME);
const { Readable } = require("stream");

exports.uploadImage = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    console.log("No file uploaded");
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
    private: true, // ensures the file is not publicly accessible
    contentType: "auto",
  });

  writeStream.on("error", (err) => {
    console.error(`Error uploading image: ${err}`);
    res.status(500).send("Error uploading image.");
  });

  writeStream.on("finish", () => {
    console.log(`Image uploaded to ${destinationPath} in bucket.`);
    // Generate a signed URL for secure access
    const options = {
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
    };
    bucket.file(destinationPath).getSignedUrl(options, (err, url) => {
      if (err) {
        console.error(`Error generating signed URL: ${err}`);
        return res.status(500).send("Error generating signed URL.");
      }
      console.log(`Signed URL for ${destinationPath}: ${url}`);
      res.status(200).send({ url }); // Send the signed URL as a response
    });
  });

  fileStream.pipe(writeStream);
};

// Method to fetch an image securely through a signed URL
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
