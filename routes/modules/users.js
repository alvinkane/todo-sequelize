const express = require("express");
const router = express.Router();
const passport = require("passport");

const bcrypt = require("bcryptjs");

const db = require("../../models");
const Todo = db.Todo;
const User = db.User;

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("warning_msg", "請輸入帳號及密碼!");
      return res.redirect("/users/login");
    }
    return next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const errors = [];
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: "所有欄位都是必填。" });
    }
    if (password !== confirmPassword) {
      errors.push({ message: "密碼與確認密碼不相符！" });
    }
    if (errors.length) {
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }
    // 密碼雜湊
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // find or create
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password: hash },
    });
    // 判斷是否已存在
    if (!created) {
      errors.push({ message: "這個 Email 已經註冊過了。" });
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出。");
  res.redirect("/users/login");
});

module.exports = router;
