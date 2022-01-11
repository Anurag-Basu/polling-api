const Question = require("../../../models/questions.model");
const Option = require("../../../models/options.model");

// Get all questions
module.exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).populate("options");

    return res.status(200).json({
      success: true,
      message: "All questions",
      data: {
        questions,
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

// Get single question
module.exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("options");

    if (!question)
      return res.status(400).json({
        success: false,
        message: "Question does not exist.",
      });

    return res.status(200).json({
      success: true,
      message: "Question",
      data: {
        question,
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

// Create question
module.exports.create = async (req, res) => {
  try {
    if (!req.body.title)
      return res.status(400).json({
        success: false,
        message: "Please provide a title for question",
      });

    // Create only unique questions
    const existQuestion = await Question.find({ title: req.body.title });
    console.log({ existQuestion });
    if (existQuestion.length > 0)
      return res.status(400).json({
        success: false,
        message: "Question already exist",
      });

    const question = await Question.create(req.body);

    return res.status(200).json({
      success: true,
      message: "New question created",
      data: {
        question,
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

// Add option to a question
module.exports.createOption = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("options");

    if (!question)
      return res.status(400).json({
        success: false,
        message: "Question does not exist.",
      });

    if (!req.body.text)
      return res.status(400).json({
        success: false,
        message: "Please provide a text for option",
      });

    const existOption = question.options.filter(
      (op) => op.text.toLowerCase() === req.body.text.toLowerCase()
    );

    // Add only unique options
    if (existOption.length > 0)
      return res.status(400).json({
        success: false,
        message: "Option already exist",
      });

    const option = await Option.create(req.body);

    // Add voting link of an option
    option.linkToVote = `https://polling-api-cn.herokuapp.com/api/v1/options/${option._id}/add_vote`;
    await option.save();

    question.options.push(option);
    await question.save();

    return res.status(200).json({
      success: true,
      message: "Option created",
      data: {
        question,
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

// Delete question
module.exports.delete = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question)
      return res.status(400).json({
        success: false,
        message: "Question does not exist.",
      });

    // Delete question if it has 0 options
    if (question.options.length < 1) {
      question.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Question deleted",
        data: {
          question,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Question is not empty",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: e,
    });
  }
};
