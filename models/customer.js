const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 30, required: true },
    phone: { type: Number, minlength: 3, maxlength: 30, required: true },
    isGold: { type: Boolean, default: false },
  })
);

function validateCustomer(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(genre);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
