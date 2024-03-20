const Condition = require("../../models/Condition");

const getCondition = async (req, res) => {
  try {
    const condition = await Condition.findById(req.params.id);
    res.status(200).json(condition);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllConditions = async (req, res) => {
  try {
    const conditions = await Condition.find();
    res.status(200).json(conditions);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getCondition,
  getAllConditions,
};
