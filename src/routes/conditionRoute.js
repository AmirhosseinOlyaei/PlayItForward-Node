const express = require("express");
const router = express.Router();

const {
  getCondition,
  getAllConditions,
} = require("../controllers/conditionController.js");

router.get("/conditions/:id", getCondition);
router.get("/conditions", getAllConditions);

module.exports = router;
