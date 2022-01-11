const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// read request
app.use(express.json());

// MongoDB
const db = require("./config/mongoose");

// Use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in firing up the server : ${err}`);
  } else {
    console.log(`server is running on ${port}`);
  }
});

module.exports = app;
