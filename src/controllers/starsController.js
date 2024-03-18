const Star = require("../models/stars");

const createStar = async (req, res) => {
  const star = new Star(req.body);
  try {
    const savedStar = await star.save();
    res.status(200).json(savedStar);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStar = async (req, res) => {
  try {
    const star = await Star.findById(req.params.id);
    res.status(200).json(star);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createStar,
  getStar,
};
