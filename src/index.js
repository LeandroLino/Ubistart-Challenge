const express = require("express");
const bodyParse = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

require("./controlles/userControlles")(app);
require("./controlles/todoControlles")(app);

app.listen(process.env.PORT || 3002, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

module.exports = app;
