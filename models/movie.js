const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 250,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 250,
    required: true,
  },
});
const Movie = mongoose.model("Movies", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
