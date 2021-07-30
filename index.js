const express = require("express");
require("express-async-errors");
const debug = require("debug")("app:startup");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const user = require("./routes/user");
const auth = require("./routes/auth");
const home = require("./routes/home");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidlyProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected To Database(vidlyProject)"))
  .catch((err) => console.log(err));

const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(logger);
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgen Enabled");
}

app.set("view engine", "pug");
app.set("views", "./views");
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", user);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Node app are Running On Port:" + port);
});
