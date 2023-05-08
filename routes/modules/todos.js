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
router.post("/", async (req, res) => {
  // 取出資料
  const name = req.body.name;
  const UserId = req.user.id;
  // 確認有無內容
  if (!name) res.redirect("/todos/new");
  try {
    // 建立資料
    await Todo.create({ name, UserId });
    res.redirect("/");
  } catch (err) {
    res.send(err);
  }
});

// 瀏覽detail頁面
router.get("/:id", async (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  try {
    const todo = await Todo.findOne({ where: { id, UserId } });
    res.render("detail", { todo: todo.toJSON() });
  } catch (error) {
    res.send(error);
  }
});

// 瀏覽edit頁面
router.get("/:id/edit", async (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  try {
    const todo = await Todo.findOne({ where: { id, UserId } });
    console.log(todo.get());
    console.log(todo.toJSON());
    res.render("edit", { todo: todo.toJSON() });
  } catch (err) {
    res.send(err);
  }
});

// edit資料

// delete資料

module.exports = router;
