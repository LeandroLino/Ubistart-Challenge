const express = require("express");
const bodyParse = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

require("./controlles/userControlles")(app);
require("./controlles/todoControlles")(app);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running in https://localhost:3002/");
});

module.exports = app;
