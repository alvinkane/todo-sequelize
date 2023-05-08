const express = require("express");
const router = express.Router();

const db = require("../../models");
const Todo = db.Todo;
const User = db.User;

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    res.render("detail", { todo: todo.toJSON() });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
