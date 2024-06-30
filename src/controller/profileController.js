// src/controller/profileController.js
exports.authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

exports.renderProfile = (req, res) => {
  res.render("profile", { user: req.user });
};
