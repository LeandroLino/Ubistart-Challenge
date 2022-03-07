const bcrypt = require("bcryptjs");
const { response } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth");

const Todo = require("../models/Todo");
const User = require("../models/User");

const router = express.Router();

router.use(authMiddleware);

router.post("/create", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.userId });
    const id = await Todo.find({});
    id.length > 0 ? (req.body.id = id.slice(-1)[0].id + 1) : (req.body.id = 0);
    const response = await Todo.create({ ...req.body, user: user });
    res.status(201).send({ response });
  } catch (err) {
    return res.send(err);
  }
});

router.put("/finish/:id", async (req, res) => {
  try {
    const currentTime = {
      finishedAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };
    const { id } = req.params;
    const response = await Todo.findOneAndUpdate({ id }, currentTime);
    response.save();
    res.send({ ...response._doc, ...currentTime });
  } catch (err) {
    return res.send(err);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const currentTime = {
      updateAt: new Date().toISOString(),
    };
    req.body = { ...req.body, ...currentTime };

    const { id } = req.params;
    const todo = await Todo.findOne({ id });
    if (todo.finishedAt) {
      res.status(401).send({
        code: 401,
        message: "Cannot edit a finalized TODO",
      });
    }
    const response = await Todo.findOneAndUpdate({ id }, req.body);
    response.save();
    res.send({ ...response._doc, ...req.body });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/list", async (req, res) => {
  try {
    const currentDate = new Date().toISOString().substring(0, 10);
    const currentHours = new Date().toISOString().substring(11, 19);
    const user = await User.findOne({ id: req.userId });
    const length = (await Todo.find({})).length;
    if (user.role > 0) {
      const limit = req.headers.limit;
      const start = req.headers.start;
      const todo = await Todo.find({}, {}, { skip: start, limit: limit });
      const list = todo.map(async (value) => {
        const date = value.deadline.substring(0, 10);
        const hours = value.deadline.substring(11, 19);
        const currentUser = await User.findOne({
          _id: value.user.toString(),
        }).select("email");
        if (!(date > currentDate)) {
          if (!(hours > currentHours)) {
            return { ...value._doc, late: true, user: currentUser };
          }
        }
        return { ...value._doc, user: currentUser };
      });
      if (list.length > 0) {
        res.send({ tasks: await Promise.all(list), count: length });
      } else {
        res.send([]);
      }
      return;
    }
    const limit = req.headers.limit;
    const start = req.headers.start;
    const todo = await Todo.find(
      { user: user._id.toString() },
      {},
      { skip: start, limit: limit }
    );

    const list = todo.map((value, index) => {
      const date = value.deadline.substring(0, 10);
      const hours = value.deadline.substring(11, 19);
      if (!(date > currentDate)) {
        if (!(hours > currentHours)) {
          return { ...value._doc, late: true };
        }
      }
      return value;
    });
    if (list.length > 0) {
      res.send({ list, count: length });
    } else {
      res.send({ list: [], count: 0 });
    }
  } catch (err) {
    return res.send(err);
  }
});

module.exports = (app) => app.use("/todo", router);
