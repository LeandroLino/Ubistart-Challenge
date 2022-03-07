const express = require("express");
const bodyParse = require("body-parser");

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

require("./controlles/todoControlles")(app);
require("./controlles/userControlles")(app);

module.exports = app;
