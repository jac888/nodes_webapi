const mongoose = require("mongoose");
const Joi = require("joi"); //check webapi parameter schema

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20
    },
    phone: {
      type: String,
      required: false
    }
  })
);

function validateCustomers(Customer) {
  const schema = Joi.object()
    .keys({
      name: Joi.string()
        .min(1)
        .max(10)
        .required(),
      phone: Joi.string()
        .min(10)
        .required()
    })
    .with("name", "phone");
  return Joi.validate(Customer, schema);
}

function validateGenresForPut(Customer) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(10),
    id: Joi.number().required()
  });
  const resut = Joi.validate(Customer, schema);
  console.log(result);
}

exports.Customer = Customer;
exports.Validate = validateCustomers;
