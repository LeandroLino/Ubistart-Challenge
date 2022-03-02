const express = require("express");
const bodyParse = require("body-parser");

const app = express();
const request = require("request");

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

const swaggerUi = require("swagger-ui-express");
const openApiDocumentation = require("./api.schema.json");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.get("/", async (req, res) => {
  res.send("Back-end Challenge 2021 🏅 - Space Flight News");
});

require("./controlles/authControlles")(app);
console.log("Server is running at https://localhost:3000");
app.listen(3000);
