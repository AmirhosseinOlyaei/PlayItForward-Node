const RequestToy = require("../../models/RequestToy.js");

exports.createToyRequest = async (req, res) => {
  try {
    const makeRequest = await RequestToy.create(req.body);
    res.status(201).json(makeRequest);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Function to get all ToyListings
exports.getAllToyRequest = async (req, res) => {
  try {
    const requests = await RequestToy.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
