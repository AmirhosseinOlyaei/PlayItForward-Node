const Delivery_method = require("../../models/Delivery_method");

const getDelivery_method = async (req, res) => {
  try {
    const delivery_method = await Delivery_method.findById(req.params.id);
    res.status(200).json(delivery_method);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllDelivery_methods = async (req, res) => {
  try {
    const delivery_methods = await Delivery_method.find();
    res.status(200).json(delivery_methods);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getDelivery_method,
  getAllDelivery_methods,
};
