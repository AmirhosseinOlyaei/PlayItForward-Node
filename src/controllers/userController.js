const User = require("../../models/user");

const createUser = async (req, res) => {
  const user_values = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_picture: "",
    nickname: "",
    zipcode: "",
    action: "/users/add",
    submit: "Add",
    title: "Add a User",
  };
  res.render("pages/user", {
    user_values,
    errors: req.flash("error"),
    info: req.flash("info"),
  });
};

const updateUser = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.user, created_by_id: req.user.id },
      req.body,
      { runValidators: true }
    );
    req.flash("info", "The user entry was updated.");
    res.redirect("/users");
  } catch (error) {
    if (error.name === "ValidationError") {
      const user_values = {
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_picture: req.body.profile_picture,
        nickname: req.body.nickname,
        zipcode: req.body.zipcode,
        action: `/users/update/${req.params.user}`,
        submit: "Update",
        title: "Edit a User Entry",
      };
      return res.render("pages/user", {
        user_values,
        errors: req.flash("error"),
        info: req.flash("info"),
      });
    } else {
      return next(error);
    }
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

/*const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};*/

const getAllUsers = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "User",
          localField: "created_by_id",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $unwind: "$created_by",
      },
      {
        $lookup: {
          from: "User",
          localField: "modified_by_id",
          foreignField: "_id",
          as: "modified_by",
        },
      },
      {
        $unwind: "$modified_by",
      },
      {
        $project: {
          email: 1,
          first_name: 1,
          last_name: 1,
          profile_picture: 1,
          nickname: 1,
          zipcode: 1,
          created_by: {
            $concat: ["$created_by.first_name", " ", "$created_by.last_name"],
          },
          modified_by: {
            $concat: ["$modified_by.first_name", " ", "$modified_by.last_name"],
          },
          created_date: 1,
          modified_date: 1,
        },
      },
    ];

    const aggregatedUsers = await User.aggregate(pipeline);
    res.status(200).json(aggregatedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
};
