// src/services/ZipCodeService.js
const ZipCode = require("../models/ZipCode");

class ZipCodeService {
  static async findZipCodesByPlaceId(placeId) {
    try {
      const location = await ZipCode.findOne({ placeId: placeId });
      if (!location) {
        return []; // Return an empty array if no location found
      }
      return location.zipCodes;
    } catch (error) {
      console.error("Database error when fetching zip codes:", error);
      throw new Error(
        "Database error when fetching zip codes: " + error.message
      );
    }
  }
}

module.exports = ZipCodeService;
