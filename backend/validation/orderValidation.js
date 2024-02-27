const Joi = require("joi");

const orderValidation = (order) => {
  const schema = Joi.object({
    shippingAddress: Joi.object({
      fullName: Joi.string().min(3).max(50).required(),
      address: Joi.string().min(3).max(200).required(),
      city: Joi.string().min(3).max(50).required(),
      postalcode: Joi.string().min(3).max(10).required(),
      country: Joi.string().min(3).max(50).required(),
    }).required(),
    totalPrice: Joi.number().positive().required(),
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  });

  return schema.validate(order);
};

module.exports = orderValidation;
