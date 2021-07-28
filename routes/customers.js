const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true },
  phone: { type: Number },
});

function validateCustomer(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(genre);
}

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.status(200).send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.status(200).send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold || false,
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("Customer with the following id Not Found");

  res.status(200).send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove({ _id: req.params.id });

  if (!customer)
    return res.status(404).send("Customer With The Following Id Is Not Found");

  res.status(200).send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send("Customer With The Following Id Is Not Found");

  res.status(200).send(customer);
});

module.exports = router;
