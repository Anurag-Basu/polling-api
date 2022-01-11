const express = require("express");
const router = express.Router();

const questionController = require("../../../controllers/api/v1/question.controller");

// get all questions
router.get("/", questionController.getAllQuestions);

// get single question
// params: question id
router.get("/:id", questionController.getQuestion);

// create a question
// body : {title: string}
router.post("/create", questionController.create);

// create options
// params: question id
// body: {text: string}
router.post("/:id/options/create", questionController.createOption);

// delete a question
// params: question id
router.delete("/:id/delete", questionController.delete);

module.exports = router;
