const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController.js");

// Define routes
router.post("/", messageController.sendMessage);
router.get("/", messageController.getAllMessages);

module.exports = router;
