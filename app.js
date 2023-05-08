const express = require("express");
const exhbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = process.env.PORT;

const routes = require("./routes");

const usePassport = require("./config/passport");

app.engine("hbs", exhbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

usePassport(app);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(routes);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
