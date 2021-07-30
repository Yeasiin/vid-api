const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({ name: Joi.string().min(3).max(20).required() });

  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;
