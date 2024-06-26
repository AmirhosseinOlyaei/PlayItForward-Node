// src/router/userRouter.js
const express = require("express");
const router = express.Router();

const userController = require("../controller/userController.js");

// Define routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);

module.exports = router;
