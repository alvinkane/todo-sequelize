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
    // 密碼雜湊
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // find or create
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password: hash },
    });
    // 判斷是否已存在
    if (!created) {
      console.log("User already exist!");
      return res.render("register", { name, email, password, confirmPassword });
    }
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
