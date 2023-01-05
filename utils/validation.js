const joi = require('joi');

const registerValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phone: joi.string().required(),
  gender: joi.string().required(),
  otherNames: joi.string(),
  role: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(5),
});
const bookingValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phone: joi.string().required(),
  roomType: joi.string().required(),
  rentPeriod: joi.number().required(),
  occupancy:joi.string().required(),
  gender: joi.string().required(),
  otherNames: joi.string(),
  email: joi.string().email().required(),
});

const loginValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(5),
});

module.exports = {
  registerValidator,
  loginValidator,
  bookingValidator,
};
