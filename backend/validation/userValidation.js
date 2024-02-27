const Joi = require("joi");

const userValidation = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).optional(),
    lastname: Joi.string().alphanum().min(3).max(30).optional(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    isAdmin: Joi.boolean().default(false),
    purchasedItems: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
    cartItems: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
          quantity: Joi.number().integer().min(1).max(1000).required(),
        })
      )
      .optional(),
  });

  return schema.validate(user);
};

module.exports = userValidation;
