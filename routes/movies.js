const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const auth = require("./../middleware/auth");

// router.get("/", (req, res) => {
//   res.send({ name: "Arfat" });
// });

router.get("/", async (req, res) => {
  const Movies = await Movie.find().sort("name");
  res.send(Movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if (!genre) return res.status(400).send("Invalid Genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();

  res.status(200).send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("Movie With The Following Id Is Not Found");

  res.status(200).send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("Movie With The Following Id Is Not Found");

  res.status(200).send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("Movie With The Following Id is Not Found");

  res.status(200).send(movie);
});

module.exports = router;
