const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("Logged in successfully");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out successfully");
});

module.exports = router;
