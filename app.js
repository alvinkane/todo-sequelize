const express = require("express");
const exhbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");

const app = express();
const port = 3000;

const routes = require("./routes");

const usePassport = require("./config/passport");

app.engine("hbs", exhbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "ThisSecretIsForTodoList",
    resave: false,
    saveUninitialized: true,
  })
);

usePassport(app);

app.use(routes);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
