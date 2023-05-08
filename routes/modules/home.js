const express = require("express");
const router = express.Router();

const db = require("../../models");
const Todo = db.Todo;
const User = db.User;

router.get("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    // 如果找不到回傳錯誤
    if (!user) throw new Error("user not found");
    // 查詢user id對應資料
    const todos = await Todo.findAll({
      raw: true,
      nest: true,
      where: { UserId: user.toJSON().id },
      order: [["name", "DESC"]], // 將資料排序
    });
    res.render("index", { todos });
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
});

module.exports = router;
