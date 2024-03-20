const Status = require("../models/status");

const getStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getStatus,
  getAllStatuses,
};
