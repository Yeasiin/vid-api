const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App By Pug",
    message: "Hello World In Express App",
  });
});

module.exports = router;
