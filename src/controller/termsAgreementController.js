// termsController.js

const User = require("../../models/user");

exports.agreeToTerms = async (req, res) => {
  const { id } = req.params; // Assuming the user ID is passed as a URL parameter
  const agreementDate = new Date(); // Current date and time

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          "termsAgreed.agreed": true,
          "termsAgreed.dateAgreed": agreementDate,
        },
      },
      { new: true } // Returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Terms and conditions accepted.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
