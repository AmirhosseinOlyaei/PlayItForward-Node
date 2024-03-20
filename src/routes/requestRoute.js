const express = require("express");
const router = express.Router();

const {
  createRequest,
  getRequest,
  getAllRequests,
} = require("../controllers/requestController.js");

router.post("/requests", createRequest);
router.get("/requests/:id", getRequest);
router.get("/requests", getAllRequests);

module.exports = router;
