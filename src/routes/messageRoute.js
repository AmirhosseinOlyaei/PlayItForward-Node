const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessage,
  getAllMessages,
} = require("../controllers/messageController.js");

router.post("/messages", createMessage);
router.get("/messages/:id", getMessage);
router.get("/messages", getAllMessages);

module.exports = router;
