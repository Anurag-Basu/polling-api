const express = require("express");
const router = express.Router();


// Route for handling questions.
router.use('/questions', require("./questions.route"));

// Route for handling options.
router.use('/options', require("./options.route"));


module.exports = router;