const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

const User = require("../models/User");

const router = express.Router();

function createHashToken(params) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/register", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ code: 400, message: "Error in payload" });
    }
    req.body.role = undefined;
    const { email } = req.body;
    if (await User.findOne({ email })) {
      res.status(409).send({
        code: 409,
        message: "User already exists",
      });
    }

    if (req.body.id) {
      req.body.id = undefined;
    }
    const id = await User.find({}, { _id: 0, __v: 0 });
    id.length > 0 ? (req.body.id = id.slice(-1)[0].id + 1) : (req.body.id = 0);
    const response = await User.create(req.body);
    response.password = undefined;
    response._id = undefined;
    response.__v = undefined;
    res
      .status(201)
      .send({ response, token: createHashToken({ id: response.id }) });
  } catch (err) {
    return res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({
        code: 404,
        message: "User not found",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(403).send({
        code: 403,
        message: "invalid credentials",
      });
    }

    user.password = undefined;
    user._id = undefined;
    user.__v = undefined;
    res.send({
      user,
      token: createHashToken({ id: user.id }),
    });
  } catch (err) {
    return res.send({ err: err.name });
  }
});

module.exports = (app) => app.use("", router);
