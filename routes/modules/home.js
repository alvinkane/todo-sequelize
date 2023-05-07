const express = require("express");
const router = express.Router();

const db = require("../../models");
const Todo = db.Todo;
const User = db.User;

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll({ raw: true, nest: true });
    res.render("index", { todos });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
