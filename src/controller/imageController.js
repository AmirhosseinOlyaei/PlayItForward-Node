const Image = require("../../models/Images.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.uploadImage = async (req, res) => {
  try {
    const newImage = new Image({
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newImage.save();
    res
      .status(201)
      .send({ message: "Image uploaded successfully", id: newImage._id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
