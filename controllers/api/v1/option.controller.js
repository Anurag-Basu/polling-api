const Option = require("../../../models/options.model");

// Add votes to an option
module.exports.addVote = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);

    if (!option)
      return res.status(400).json({
        success: false,
        message: "Option does not exist.",
      });

    option.votes += 1;
    await option.save();

    return res.status(200).json({
      success: true,
      message: "Voted",
      data: {
        option,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: e,
    });
  }
};

// Delete an option
module.exports.delete = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);

    if (!option)
      return res.status(400).json({
        success: false,
        message: "Option does not exist.",
      });

    // Delete option if it has 0 votes
    if (option.votes < 1) option.deleteOne();
    else return res.status(401).json({
      success: false,
      message: `Option has ${option.votes} votes.`,
    });

    return res.status(200).json({
      success: true,
      message: "Option deleted",
      data: {
        option,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: e,
    });
  }
};
