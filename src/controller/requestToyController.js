const RequestToy = require("../../models/RequestToy.js");
// Function to create a new request
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

// Function to get a single request
exports.getToyRequest = async (req, res) => {
  try {
    const request = await RequestToy.findById(req.params.id);
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all Toy requests
exports.getAllToyRequest = async (req, res) => {
  try {
    const requests = await RequestToy.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
