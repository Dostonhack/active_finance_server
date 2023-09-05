// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 7000;

// database connection
mongoose.connect(process.env.DB_URL, {
  //   useNewUrlParser: true,
  //   useUnifieadTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connect to the databace"));

// milddlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "my secrest key",
    saveUninitialized: true,
    resave: false,
  })
);

// set template engine
app.set("view engine", "ejs");

app.use((req, res, next) => {
  (res.locals.message = req), session.message;
  delete req.session.message;
  next();
});

// route prefix
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
});
