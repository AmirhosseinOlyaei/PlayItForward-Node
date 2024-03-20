const express = require("express");
const router = express.Router();

const {
  getStatus,
  getAllStatuses,
} = require("../controllers/statusController.js");

router.get("/status/:id", getStatus);
router.get("/status", getAllStatuses);

module.exports = router;
