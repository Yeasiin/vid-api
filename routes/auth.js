const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = user.generateAuthToken();

  res.status(200).send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
