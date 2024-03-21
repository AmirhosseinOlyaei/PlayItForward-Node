const Toy = require("../../models/Toy");

const createToy = async (req, res) => {
  const toy = new Toy(req.body);
  try {
    const savedToy = await toy.save();
    res.status(200).json(savedToy);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateToy = async (req, res) => {
  try {
    const updatedToy = await Toy.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedToy);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getToy = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "User",
          localField: "given_to_user_id",
          foreignField: "_id",
          as: "given_to_user",
        },
      },
      {
        $unwind: "$given_to_user",
      },
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
        $unwind: {
          path: "$modified_by",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          user_id: 1,
          user_name: { $concat: ["$user.first_name", " ", "$user.last_name"] },
          given_to_user_id: 1,
          given_to_user_name: {
            $concat: [
              "$given_to_user.first_name",
              " ",
              "$given_to_user.last_name",
            ],
          },
          title: 1,
          description: 1,
          condition: 1,
          delivery_method: 1,
          pictures: 1,
          category: 1,
          zip_code: 1,
          status: 1,
          created_by_id: 1,
          created_by_name: {
            $concat: ["$created_by.first_name", " ", "$created_by.last_name"],
          },
          created_date: 1,
          modified_by_id: 1,
          modified_by_name: {
            $concat: ["$modified_by.first_name", " ", "$modified_by.last_name"],
          },
          modified_date: 1,
        },
      },
    ];

    const aggregatedToy = await Toy.aggregate(pipeline);
    res.status(200).json(aggregatedToy[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllToys = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "User",
          localField: "given_to_user_id",
          foreignField: "_id",
          as: "given_to_user",
        },
      },
      {
        $unwind: "$given_to_user",
      },
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
        $unwind: {
          path: "$modified_by",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          user_id: 1,
          user_name: { $concat: ["$user.first_name", " ", "$user.last_name"] },
          given_to_user_id: 1,
          given_to_user_name: {
            $concat: [
              "$given_to_user.first_name",
              " ",
              "$given_to_user.last_name",
            ],
          },
          title: 1,
          description: 1,
          condition: 1,
          delivery_method: 1,
          pictures: 1,
          category: 1,
          zip_code: 1,
          status: 1,
          created_by_id: 1,
          created_by_name: {
            $concat: ["$created_by.first_name", " ", "$created_by.last_name"],
          },
          created_date: 1,
          modified_by_id: 1,
          modified_by_name: {
            $concat: ["$modified_by.first_name", " ", "$modified_by.last_name"],
          },
          modified_date: 1,
        },
      },
    ];

    const aggregatedToys = await Toy.aggregate(pipeline);
    res.status(200).json(aggregatedToys);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteToy = async (req, res) => {
  try {
    await Toy.findByIdAndDelete(req.params.id);
    res.status(200).json("Toy has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createToy,
  updateToy,
  getToy,
  getAllToys,
  deleteToy,
};
