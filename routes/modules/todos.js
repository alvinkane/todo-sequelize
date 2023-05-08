const express = require("express");
const router = express.Router();

const db = require("../../models");
const Todo = db.Todo;
const User = db.User;

// 前往new頁面
router.get("/new", (req, res) => {
  res.render("new");
});

// 建立資料

// 瀏覽detail頁面
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    res.render("detail", { todo: todo.toJSON() });
  } catch (error) {
    res.send(error);
  }
});

// 瀏覽edit頁面

// edit資料

// delete資料

module.exports = router;
