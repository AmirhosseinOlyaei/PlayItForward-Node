// src/services/ZipCodeService.js
const ZipCode = require("../models/ZipCode");

class ZipCodeService {
  static async findZipCodesByPlaceId(placeId) {
    const location = await ZipCode.findOne({ placeId: placeId });
    if (!location) {
      return []; // Return an empty array if no location found
    }
    return location.zipCodes;
  }
}

module.exports = ZipCodeService;
