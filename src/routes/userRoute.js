const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController.js");

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.get("/users/:id", getUser);

module.exports = router;
