const express = require("express");
const router = express.Router();
const termsController = require("./termsController"); // Adjust the path as needed

router.put("/agree/:userId", termsController.agreeToTerms);
router.get("/check/:userId", termsController.checkTermsAgreement);

module.exports = router;
