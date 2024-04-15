// src/controller/geoController.js
const ZipCodeService = require("../../services/ZipCodeService");

exports.getZipCodesByPlaceId = async (req, res) => {
  const { placeId } = req.query;
  const zipCodes = await ZipCodeService.findZipCodesByPlaceId(placeId);
  if (zipCodes.length === 0) {
    return res
      .status(200)
      .json({ message: "No zip codes found for the provided place ID" });
  }
  res.json({ zipCodes });
};
