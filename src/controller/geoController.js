// src/controller/geoController.js
const ZipCodeService = require("../../services/ZipCodeService");

exports.getZipCodesByPlaceId = async (req, res) => {
  const { placeId } = req.query;
  try {
    const zipCodes = await ZipCodeService.findZipCodesByPlaceId(placeId);
    if (zipCodes.length === 0) {
      return res
        .status(404)
        .json({ message: "No zip codes found for the provided place ID" });
    }
    res.json({ zipCodes });
  } catch (error) {
    console.error("Failed to fetch zip codes:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch zip codes", error: error.message });
  }
};
