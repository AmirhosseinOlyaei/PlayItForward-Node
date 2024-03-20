const express = require("express");

const router = express.Router();

const { getCategory } = require("../controllers/categoryController.js");

router.get("/categories/:id", getCategory);

module.exports = router;
