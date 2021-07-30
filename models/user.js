const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    createIndexes: { unique: true },
    required: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtToken")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
