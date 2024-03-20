const Star = require("../../models/Stars");

const createStar = async (req, res) => {
  const star = new Star(req.body);
  try {
    const savedStar = await star.save();
    res.status(200).json(savedStar);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStar = async (req, res) => {
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
          localField: "user_id_given_by",
          foreignField: "_id",
          as: "user_given_by",
        },
      },
      {
        $unwind: "$user_given_by",
      },
      {
        $lookup: {
          from: "User",
          localField: "user_id_given_to",
          foreignField: "_id",
          as: "user_given_to",
        },
      },
      {
        $unwind: "$user_given_to",
      },
      {
        $project: {
          _id: 0,
          user_id_given_by: 1,
          user_given_by_name: {
            $concat: [
              "$user_given_by.first_name",
              " ",
              "$user_given_by.last_name",
            ],
          },
          user_id_given_to: 1,
          user_given_to_name: {
            $concat: [
              "$user_given_to.first_name",
              " ",
              "$user_given_to.last_name",
            ],
          },
          number_of_stars: 1,
          created_date: 1,
        },
      },
    ];

    const aggregatedStar = await Star.aggregate(pipeline);
    res.status(200).json(aggregatedStar[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createStar,
  getStar,
};
