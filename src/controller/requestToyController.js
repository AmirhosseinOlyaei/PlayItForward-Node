const RequestToy = require("../../models/RequestToy.js");
const User = require("../../models/User.js");
const ToyListing = require("../../models/ToyListing.js");

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
  const { id } = req.params;
  try {
    const request = await RequestToy.findById(id)
      .populate({
        path: "requester",
        select: "email first_name nickname",
        model: User,
      })
      .populate({
        path: "toyRequested",
        select: "title description zipcode",
        model: ToyListing,
      })
      .exec();

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
