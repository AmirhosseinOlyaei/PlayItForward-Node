// src/controller/authController.js
const User = require("../../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const logger = require("../config/logger");

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name, termsAndConditions } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.googleId) {
        logger.info(`Signup attempt with Google account email: ${email}`);
        return res.status(400).json({
          message:
            "You have previously signed in using Google. Please use Google login to sign in.",
        });
      } else {
        logger.info(`Email already in use: ${email}`);
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const nickname = `${first_name} ${last_name}`;
    const user = new User({
      email,
      password,
      first_name,
      last_name,
      termsAndConditions,
      nickname,
    });
    await user.save();
    logger.info(`User created successfully: ${email}`);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    logger.error(`Error during signup: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      logger.error(`Error during signin: ${err.message}`);
      return next(err);
    }
    if (!user) {
      logger.info(`Invalid email or password attempt: ${req.body.email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    req.logIn(user, (err) => {
      if (err) {
        logger.error(`Error during login: ${err.message}`);
        return next(err);
      }
      const token = generateToken(user);
      logger.info(`User signed in successfully: ${user.email}`);
      res.json({ token, user });
    });
  })(req, res, next);
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.info(`Forgot password attempt for non-existent email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://${req.headers.host}/reset-password/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Password reset link sent to: ${email}`);
    res.json({ message: "Password reset link sent" });
  } catch (error) {
    logger.error(`Error during forgot password: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      logger.info(`Invalid or expired password reset token`);
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    logger.info(`Password has been reset for user: ${user.email}`);
    res.json({ message: "Password has been reset" });
  } catch (error) {
    logger.error(`Error during password reset: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.authenticateGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = (req, res) => {
  logger.info(`Google auth callback for user: ${req.user.email}`);
  res.send("You have been redirected to the homepage");
};
