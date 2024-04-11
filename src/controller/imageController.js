const multer = require("multer");

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

exports.uploadSingleImage = upload.single("image");

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  const file = req.file;
  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
    file: {
      name: file.filename,
      size: file.size,
      type: file.mimetype,
      url: `https://yourapi.com/uploads/${file.filename}`,
    },
  });
};
