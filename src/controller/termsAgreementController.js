const User = require("../models/user"); // Adjust the path as needed

// Function to record agreement to the terms
exports.agreeToTerms = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { agreedToTerms: true },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({
        message: "Terms agreement updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to check if a user has agreed to the terms
exports.checkTermsAgreement = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ userId: user._id, agreedToTerms: user.agreedToTerms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
