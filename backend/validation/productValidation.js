const Joi = require("joi");

const productValidation = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    image: Joi.string().required(),
    brand: Joi.string().min(3).max(50).required(),
    category: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    numRev: Joi.number().integer().min(0).required(),
  });

  return schema.validate(product);
};

module.exports = productValidation;
