const express = require("express");
const router = express.Router();

const {
  getDelivery_method,
  getAllDelivery_methods,
} = require("../controllers/delivery_methodController.js");

router.get("/delivery_methods/:id", getDelivery_method);
router.get("/delivery_methods", getAllDelivery_methods);

module.exports = router;
