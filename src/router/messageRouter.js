const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController.js");

// Define routes
router.post("/", messageController.sendMessage); // Create a message
router.get("/:id", messageController.getMessage); // Get a single message by ID
router.get("/", messageController.getAllMessages); // Get all messages
router.delete("/:id", messageController.deleteMessage); // Delete a message by ID

module.exports = router;
