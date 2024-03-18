const Toy = require("../models/toy");

const createToy = async (req, res) => {
  const toy = new Toy(req.body);
  try {
    const savedToy = await toy.save();
    res.status(200).json(savedToy);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateToy = async (req, res) => {
  try {
    const updatedToy = await Toy.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedToy);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getToy = async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id);
    res.status(200).json(toy);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllToys = async (req, res) => {
  try {
    const toys = await Toy.find();
    res.status(200).json(toys);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteToy = async (req, res) => {
  try {
    await Toy.findByIdAndDelete(req.params.id);
    res.status(200).json("Toy has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createToy,
  updateToy,
  getToy,
  getAllToys,
  deleteToy,
};
