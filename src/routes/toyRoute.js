const express = require("express");
const router = express.Router();

const {
  createToy,
  updateToy,
  getToy,
  getAllToys,
  deleteToy,
} = require("../controllers/toyController.js");

router.post("/toys", createToy);
router.put("/toys/:id", updateToy);
router.get("/toys/:id", getToy);
router.get("/toys", getAllToys);
router.delete("/toys/:id", deleteToy);

module.exports = router;
