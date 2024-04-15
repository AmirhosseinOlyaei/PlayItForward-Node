// src/router/geoRoutes.js

const express = require("express");
const router = express.Router();
const geoController = require("../controller/geoController");

router.get("/zipcodes", geoController.getZipCodesByPlaceId);

module.exports = router;
