const express = require("express");
const router = express.Router();

const { createStar, getStar } = require("../controllers/starsController.js");

router.post("/stars", createStar);
router.get("/stars/:id", getStar);

module.exports = router;
