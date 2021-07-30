const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const auth = require("./../middleware/auth");
const admin = require("./../middleware/admin");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.status(200).send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("Genre With The Following Id Not Found");

  res.status(200).send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.status(200).send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("Genre With The Following Id Not Found");

  res.status(200).send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove({ _id: req.params.id });
  if (!genre)
    return res.status(404).send("Genre With The Following Id Not Found");

  res.status(200).send(genre);
});

module.exports = router;
