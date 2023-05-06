const express = require("express");
const exhbs = require("express-handlebars");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const app = express();
const port = 3000;

const routes = require("./routes");

app.engine("hbs", exhbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(routes);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
