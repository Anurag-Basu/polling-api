const express = require("express");
const router = express.Router();

const optionsController = require("../../../controllers/api/v1/option.controller");

// add votes to an options
// params: option id
router.get("/:id/add_vote", optionsController.addVote);

// delete an option
// params: option id
router.delete("/:id/delete", optionsController.delete);

module.exports = router;
