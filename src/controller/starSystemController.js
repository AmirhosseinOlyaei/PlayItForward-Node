const StarSystem = require("../../models/StarSystem.js");

// Function to create a new listing
exports.giveStars = async (req, res) => {
  try {
    const giveStars = await StarSystem.create(req.body);
    res.status(201).json(giveStars);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get a single star
exports.getStar = async (req, res) => {
  try {
    const star = await StarSystem.findById(req.params.id);
    res.status(200).json(star);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all stars
exports.getStars = async (req, res) => {
  try {
    const stars = await StarSystem.find();
    res.status(200).json(stars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
