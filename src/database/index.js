const mongoose = require("mongoose");
//require("dotenv").config({ path: "../.env" });
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
